const { MESSAGE_TYPE } = require('../constants/messageType');
const { redisIndex } = require('../database/connections/redis');
const { IndexConstituentsInformation, IndexRealtime, SecurityStatus } = require('../utils/initData');
const logger = require('../utils/logger');
const sessionService = require('../services/session');
const { convertTimeStringToUnix, getLocalDate } = require('../utils/time');
const { EVENT_EMIT } = require('../constants/socketEvent');
const { preprocessData } = require('../utils/index');
const { MARKET_INDEX } = require('../constants/marketIndex');
// const produceKafkaMessage = require('./kafkaHandler');
const KAFKA_MESSAGE_KEY = require('../constants/kafkaMessKey');

async function indexHandler(data, io) {
  const obj = preprocessData(data);

  if (obj[35] == MESSAGE_TYPE.ML) {
    await messMlHandler(obj);
  }

  if (obj[35] == MESSAGE_TYPE.F) {
    await messFHandler(obj, io);
  }

  if (obj[35] == MESSAGE_TYPE.M1) {
    // console.log('NEEEEEE');
    await messM1Handler(obj, io);
  }
}

async function messMlHandler(obj) {
  try {
    const indexDef = new IndexConstituentsInformation(obj);
    const indexKey = `${getLocalDate()}_INDEX_${indexDef.index_type_code}_${indexDef.market}`;
    let indexCached = await redisIndex.get(indexKey).then((data) => JSON.parse(data || '{}'));

    const symbols = indexCached.symbols ? indexCached.symbols.concat([indexDef.symbol]) : [indexDef.symbol];
    const uniqueSymbols = Array.from(new Set(symbols));

    const indexUpdated = { ...indexCached, ...indexDef, symbols: uniqueSymbols };

    await redisIndex.setEx(indexKey, 3 * 24 * 60 * 60, JSON.stringify(indexUpdated));
    // await produceKafkaMessage(KAFKA_MESSAGE_KEY.INDEXES, indexUpdated, +obj[34]);
  } catch (error) {
    logger.error('messMlHandler Index ERROR: ', error.message);
  }
}

async function messFHandler(obj, io) {
  try {
    const securityStatus = new SecurityStatus(obj);
    const securityStatusUpdated = await sessionService.updateSession(securityStatus);
    io.emit(EVENT_EMIT.SESSION_CHANGE, securityStatusUpdated);
  } catch (error) {
    logger.error('messFHandler Index ERROR: ', error.message);
  }
}

async function messM1Handler(obj, io) {
  try {
    const indexRealtime = new IndexRealtime(obj);

    let indexCached = await redisIndex
      .get(`${getLocalDate()}_INDEX_${indexRealtime.index_type_code}_${indexRealtime.market}`)
      .then((data) => (data ? JSON.parse(data) : {}));

    indexCached.prior = indexCached?.prior || indexRealtime.value_index;

    if (indexCached?.prior) {
      indexRealtime.changed = Number((indexRealtime.value_index - indexCached.prior).toFixed(2));
      indexRealtime.percent_changed = Number(((indexRealtime.changed / indexCached.prior) * 100).toFixed(2));
    }

    indexRealtime.index_name =
      indexCached?.index_name ||
      indexCached?.index_name_en ||
      MARKET_INDEX[`${indexRealtime.index_type_code}_${indexRealtime.market}`];

    // support for index chart
    const indexHistory = {
      time: convertTimeStringToUnix(obj[60]),
      valueIndexes: parseFloat(obj[30217]),
      index: parseFloat(obj[30217]),
      value: parseFloat(indexRealtime.total_value),
      volume: parseFloat(indexRealtime.total_volume),
      symbol: indexCached.index_name_en || indexRealtime.index_name || obj[30167],
      indexTypeCode: obj[30167],
    };

    io.emit(EVENT_EMIT.INDEX_CHART, indexHistory);

    indexCached = Object.assign(indexCached, indexRealtime);

    io.emit(EVENT_EMIT.INDEX_CHANGE, indexRealtime);
    const sessionData = {
      session: indexRealtime.trading_session,
      time: new Date().getTime(),
      trading_session_id: indexRealtime.trading_session_id,
      trading_session: indexRealtime.trading_session,
    };
    await Promise.all([
      redisIndex.setEx(
        `${getLocalDate()}_INDEX_${indexRealtime.index_type_code}_${indexRealtime.market}`,
        3 * 24 * 60 * 60,
        JSON.stringify(indexCached),
      ),
      redisIndex.zAdd(`${getLocalDate()}_INDEX_HISTORY_${indexRealtime.index_type_code}_${indexRealtime.market}`, {
        score: obj[34],
        value: JSON.stringify(indexHistory),
      }),
      redisIndex.setEx(
        `${getLocalDate()}_INDEX_${indexRealtime.market}_SESSION`,
        3 * 24 * 60 * 60,
        JSON.stringify(sessionData),
      ),
    ]);

    await redisIndex.expire(
      `${getLocalDate()}_INDEX_HISTORY_${indexRealtime.index_type_code}_${indexRealtime.market}`,
      3 * 24 * 60 * 60,
    );

    // await Promise.all([
    //   produceKafkaMessage(KAFKA_MESSAGE_KEY.INDEXES, indexCached, +obj[34]),
    //   produceKafkaMessage(
    //     KAFKA_MESSAGE_KEY.INDEXES_HISTORIES,
    //     {
    //       ...indexHistory,
    //       mes_seq_num: +obj[34],
    //       market: obj[30001],
    //       received_at: getLocalDate(),
    //     },
    //     +obj[34],
    //   ),
    // ]);
  } catch (error) {
    logger.error('messM1Handler Index ERROR: ', error.message);
  }
}

module.exports = { indexHandler };
