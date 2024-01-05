require('dotenv').config();
const cron = require('node-cron');
const { Server } = require('socket.io');
const logger = require('./utils/logger');
const ioClient = require('socket.io-client');

const { connectToDatabase } = require('./database/connections/mongo');
const { handleRoomEvents } = require('./utils/socket');
const { indexHandler } = require('./handlers');
const { getLatestIndexData } = require('./utils/commonFunction');
const { EVENT_EMIT } = require('./constants/socketEvent');
const { InitialMarketIndex } = require('./utils/initData');
const { redisIndex } = require('./database/connections/redis');
const { getLocalDate } = require('./utils/time');

connectToDatabase();
const io = new Server({
  allowEIO3: true,
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

const host = process.env.GATEWAY_HOST;
const stoPort = process.env.STO_PORT;
const stxPort = process.env.STX_PORT;
const upxPort = process.env.UPX_PORT;

const socketSTO = ioClient(`http://${host}:${stoPort}`);
const socketSTX = ioClient(`http://${host}:${stxPort}`);
const socketUPX = ioClient(`http://${host}:${upxPort}`);

async function readFromSocket() {
  try {
    socketSTO.on('new-message', async (data) => {
      await indexHandler(data, io);
    });

    socketSTX.on('new-message', async (data) => {
      await indexHandler(data, io);
    });

    socketUPX.on('new-message', async (data) => {
      await indexHandler(data, io);
    });

    // client join & leave to rooms
    io.on('connection', (socket) => {
      handleRoomEvents(socket);
    });
  } catch (error) {
    logger.error('Index realtime ERROR: ', error.message);
  }
}

// reset socket
cron.schedule('0 8 * * 1-5', async () => {
  const latestIndexData = await getLatestIndexData();
  latestIndexData.forEach(async (index) => {
    const indexInit = new InitialMarketIndex(index);
    io.emit(EVENT_EMIT.INDEX_CHANGE, indexInit);
    io.emit(EVENT_EMIT.INDEX_CHART, {
      symbol: indexInit.index_name_en || indexInit.index_name,
      indexTypeCode: indexInit.index_type_code,
      realTimeIndexData: [],
    });
    await Promise.all([
      redisIndex.del(`${getLocalDate()}_INDEX_HISTORY_${indexInit.index_type_code}_${indexInit.market}`),
      redisIndex.set(`${getLocalDate()}_INDEX_${indexInit.index_type_code}_${indexInit.market}`, indexInit),
    ]);
  });
});

readFromSocket();

io.listen(6789, {}, () => {
  console.log('Server socket index started on port 6789');
});
