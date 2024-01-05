const { networkInterfaces } = require('os');
const logger = require('./logger');
const { redisIndex } = require('../database/connections/redis');
const { MarketIndexModel } = require('../database/models/marketIndex');
const { getLocalDate } = require('./time');
const moment = require('moment-timezone');
const { mapData, mapDataForCallAuction } = require('./mapDataForApi');
const { TRADING_SESSION } = require('../constants/tradingSession');

function getLocalIp() {
  const nets = networkInterfaces();
  console.log({ nets });
  const results = Object.create(null); // Or just '{}', an empty object
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        //   results[name].push(net.address);
        return net.address; // get the first
      }
    }
  }
  return null;
}

function handleRegister(socketClient, dataFromClient) {
  for (const obj of dataFromClient) {
    try {
      socketClient.join('wl' + obj.symbol);
      logger.info(`Client ${socketClient.id} connected, symbols:`, [obj.symbol]);
    } catch (error) {
      logger.error(`client ${socketClient.id} handleRegister ERROR:`, [error.message || 'error']);
    }
  }
}

function handleUnregister(socketClient, dataFromClient) {
  for (const obj of dataFromClient) {
    try {
      socketClient.leave('wl' + obj.symbol);
      logger.info(`Klient ${socketClient.id} unregistered, symbols:`, [obj.symbol]);
    } catch (error) {
      logger.error(`client ${socketClient.id} unhandleRegister ERROR:`, [error.message || 'error']);
    }
  }
}

function handleDisconnect(socketClient) {
  try {
    logger.info(`client ${socketClient.id} disconnected, symbols:`, []);
  } catch (error) {
    console.log('abcdxy A4');
    logger.error(`client ${socketClient.id} disconnected ERROR:`, []);
  }
}

async function getLatestIndexData(date = null) {
  const today = getLocalDate();
  let latestIndexData = [];
  const latestDate = date
    ? moment(date).tz('Asia_Ho_Chi_Minh').format('YYYY-MM-DD')
    : moment().tz('Asia_Ho_Chi_Minh').subtract(1, 'days').format('YYYY-MM-DD');

  const indexKeys = await redisIndex.keys(`${latestDate}_INDEX_???_*`);

  if (indexKeys.length) {
    const indexesCached = await Promise.all(
      indexKeys.map(async (key) => redisIndex.get(key).then((data) => JSON.parse(data || '{}'))),
    );
    latestIndexData = indexesCached.filter((index) => index?.index_name && index?.index_type_code && index?.market);
  } else {
    const latestDate = await MarketIndexModel.findOne({ value_index: { $ne: null }, index_name: { $ne: null } })
      .sort({ received_at: -1, _id: -1 })
      .select('received_at value_index')
      .lean();

    if (!latestDate || (latestDate?.received_at === today && latestDate?.value_index)) {
      logger.info('Init market index has run before!');
      return [];
    }

    latestIndexData = await MarketIndexModel.find({
      received_at: latestDate.received_at,
      'symbols.2': { $exists: true },
      index_name: { $ne: null },
    }).lean();

    if (!latestDate || (latestDate?.received_at === today && latestDate?.prior)) return;

    latestIndexData = await MarketIndexModel.find({
      received_at: latestDate.received_at,
      'symbols.2': { $exists: true },
      index_name: { $ne: null },
    }).lean();
  }
  return latestIndexData;
}

async function stocksResponseFormatter(stocks, market = null) {
  const tradingSessionKey = `${getLocalDate()}_INDEX_${market}_SESSION`;
  const tradingSession = await redisIndex.get(tradingSessionKey);
  const jsonData = tradingSession ? JSON.parse(tradingSession) : {};
  if (jsonData.tradingSession === TRADING_SESSION['10'] || jsonData.tradingSession === TRADING_SESSION['30']) {
    return mapDataForCallAuction(stocks);
  }
  return mapData(stocks);
}

module.exports = {
  getLocalIp,
  handleRegister,
  handleUnregister,
  handleDisconnect,
  getLatestIndexData,
  stocksResponseFormatter,
};
