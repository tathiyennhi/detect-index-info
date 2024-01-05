const { createOrUpdateIndexHistory } = require('../services/indexesHistory');
const { MESSAGE_TYPE } = require('../constants/messageType');
const { IndexRealtime } = require('../utils/initData');
const logger = require('../utils/logger');
const { convertTimeStringToUnix, getLocalDate } = require('../utils/time');
const { preprocessData } = require('../utils/index');

async function indexHistoryHandler(data) {
  const obj = preprocessData(data);
  if (obj[35] == MESSAGE_TYPE.M1) {
    await messM1Handler(obj);
  }
}

async function messM1Handler(obj) {
  try {
    const indexRealtime = new IndexRealtime(obj);
    const historyEntry = {
      time: convertTimeStringToUnix(obj[60]),
      value_indexes: parseFloat(obj[30217]),
      index: parseFloat(obj[30217]),
      value: parseFloat(indexRealtime.total_value),
      volume: parseFloat(indexRealtime.total_volume),
      mes_seq_num: parseInt(obj[34], 10),
    };

    const indexHistoryData = {
      market: indexRealtime.market,
      received_at: getLocalDate(),
      symbol: indexRealtime.symbol,
      index_type_code: indexRealtime.index_type_code,
      index_history: historyEntry,
    };

    await createOrUpdateIndexHistory(indexHistoryData);
  } catch (error) {
    logger.error(`messM1Handler Index_History ERROR: ${error.message}`);
  }
}

module.exports = { indexHistoryHandler };
