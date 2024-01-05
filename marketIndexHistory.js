require('dotenv').config();
const logger = require('./utils/logger');

const { connectToDatabase } = require('./database/connections/mongo');
const { indexHistoryHandler } = require('./handlers');

connectToDatabase();

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
      await indexHistoryHandler(data);
    });

    socketSTX.on('new-message', async (data) => {
      await indexHistoryHandler(data);
    });

    socketUPX.on('new-message', async (data) => {
      await indexHistoryHandler(data);
    });
  } catch (error) {
    logger.error('Index realtime ERROR: ', error.message);
  }
}

io.listen(6790, {}, () => {
  console.log('Server socket index started on port 6790');
});
