const { IndexHistoryModel } = require('../database/models/indexHistory');
const logger = require('../utils/logger');
const moment = require('moment');

async function createOrUpdateIndexHistory(data) {
  try {
    const { market, received_at, symbol, index_type_code, index_history } = data;
    const query = { market, received_at, symbol, index_type_code };
    const updateData = {
      $push: { index_history: index_history },
    };
    const result = await IndexHistoryModel.findOneAndUpdate(query, updateData, { upsert: true, new: true }).lean();
    return result;
  } catch (error) {
    logger.error(`createOrUpdateIndexHistory ERROR: ${error.message}`);
    throw error;
  }
}

async function getIndexHistoryByIndexTypeCode(indexTypeCode) {
  try {
    const currentDate = moment().format('YYYY-MM-DD'); // Format the date as needed
    const query = { index_type_code: indexTypeCode, received_at: currentDate };
    const indexHistoryData = await IndexHistoryModel.find(query).lean();
    return indexHistoryData;
  } catch (error) {
    logger.error(`getIndexHistoryByIndexTypeCode ERROR: ${error.message}`);
    throw error;
  }
}

module.exports = { createOrUpdateIndexHistory, getIndexHistoryByIndexTypeCode };
