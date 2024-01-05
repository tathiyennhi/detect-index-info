const { redisIndex } = require('../database/connections/redis');
const { MarketIndexModel } = require('../database/models/marketIndex');
const logger = require('../utils/logger');
const _ = require('lodash');
const { respond } = require('../utils/respond');
const { getLocalDate, getLatestItemEachMinute } = require('../utils/time');

async function updateIndex(data) {
  try {
    const { index_type_code, symbol, received_at, total_msg_no, market, index_name } = data;
    const result = await MarketIndexModel.findOneAndUpdate(
      { index_type_code, received_at, market, index_name },
      {
        $set: _.omit(data, ['received_at', '_id', '__v']),
        $addToSet: { symbols: [symbol] },
      },
      { upsert: true, new: true },
    ).lean();

    if (total_msg_no === result.symbols.length) {
      console.log(`index ${result.index_name} init completed`);
    }

    return result;
  } catch (error) {
    logger.error('updateIndex ERROR: ', error.message);
  }
}

async function getIndexHistory(index, market) {
  const indexData = await redisIndex
    .get(`${getLocalDate()}_INDEX_${index}_${market}`)
    .then((data) => JSON.parse(data || '{}'));

  const realTimeIndexData = await redisIndex
    .zRangeByScore(`${getLocalDate()}_INDEX_HISTORY_${index}_${market}`, '-inf', '+inf')
    .then((data) => (!_.isEmpty(data) ? data.map((item) => JSON.parse(item || '{}')) : []));

  delete indexData.symbols;

  return {
    indexData: { ...indexData, total_value: indexData.total_value / 1000000 },
    realTimeIndexData: getLatestItemEachMinute(realTimeIndexData),
  };
}

module.exports = { updateIndex, getIndexHistory };
