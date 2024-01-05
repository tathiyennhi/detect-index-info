const { TRADING_SESSION } = require('../constants/tradingSession');
const { getLocalDate } = require('./time');
const { BOARD_EVENT } = require('../constants/boardEvent');
const { MARKET_INDEX } = require('../constants/marketIndex');
const { mappingPutThroughMarketExchange } = require('../constants/putThrough');
const { redisIndex, redisSecurities } = require('../database/connections/redis');

// mess d
class SecurityDefinition {
  constructor(dataObj) {
    this.received_at = getLocalDate();
    this.market = dataObj[30001];
    this.id = dataObj[30628];
    this.type = dataObj[30604];
    this.symbol = dataObj[55];
    this.board = dataObj[20004];
    this.ticker_code = dataObj[30624];
    this.name = dataObj[30629];
    this.name_en = dataObj[30630];
    this.floor = dataObj[1148];
    this.ceiling = dataObj[1149];
    this.prior = dataObj[20013];
    this.closing_price = dataObj[20026];
    this.open = 0;
    this.total_volume = dataObj[387];

    this.bp3 = 0;
    this.bv3 = 0;
    this.bp2 = 0;
    this.bv2 = 0;
    this.bp1 = 0;
    this.bv1 = 0;
    this.mp = 0;
    this.mv = 0;
    this.changed = 0;
    this.changed_percent = 0;
    this.ap1 = 0;
    this.av1 = 0;
    this.ap2 = 0;
    this.av2 = 0;
    this.ap3 = 0;
    this.av3 = 0;
    this.highest = 0;
    this.lowest = 0;
    this.maturity_month_year = dataObj[200];
    this.maturity_date = dataObj[541];
    this.issue_date = dataObj[225];
    this.exercise_style = dataObj[1194];
  }
}

// mess MF
class ForeignerOrderLimit {
  constructor(dataObj) {
    this.market = dataObj[30001];
    this.symbol = dataObj[55];
    this.f_room = dataObj[30558];
    this.f_total_room = dataObj[30557];
  }
}

// mess ML
class IndexConstituentsInformation {
  constructor(dataObj) {
    {
      this.received_at = getLocalDate();
      this.market = dataObj[30001];
      this.index_type_code = dataObj[30167];
      this.market_index_class = dataObj[30569];
      this.index_name = dataObj[30632] ? MARKET_INDEX[`${dataObj[30167]}_${dataObj[30001]}`] : dataObj[30167];
      this.index_name_en = dataObj[30633];
      this.total_msg_no = dataObj[30606];
      this.symbol = dataObj[55];
      this.current_msg_no = dataObj[30607];
    }
  }
}

// mess M1
class IndexRealtime {
  constructor(dataObj) {
    {
      this.received_at = getLocalDate();
      this.market = dataObj[30001];
      this.index_type_code = dataObj[30167];
      this.market_index_class = dataObj[30569];

      this.trading_session_id = dataObj[336];
      this.trading_session = TRADING_SESSION[dataObj[336]];

      this.transact_time = dataObj[60];
      this.value_index = parseFloat(dataObj[30217]);
      this.total_value = dataObj[381];
      this.total_volume = dataObj[387];
      this.contauct_acc_trdvol = dataObj[30638];

      this.ceiling_count = dataObj[30589]; // Số chứng khoán có giá trần
      this.up_count = dataObj[30590]; // Số chứng khoán có giá tăng
      this.nochange_count = dataObj[30591]; // Số chứng khoán có giá không đổi
      this.down_count = dataObj[30592]; // Số chứng khoán có giá giảm
      this.floor_count = dataObj[30593]; //Số chứng khoán có giá sàn
    }
  }
}

// mess f
class SecurityStatus {
  constructor(dataObj) {
    {
      this.received_at = getLocalDate();
      this.market = dataObj[30001];
      this.board = dataObj[20004];
      this.board_event_id = dataObj[20005];
      this.board_event = BOARD_EVENT[dataObj[20005]];
      this.sess_open_close_code = dataObj[20008];
      this.trading_session_id = dataObj[336];

      // support old version
      this.session = TRADING_SESSION[dataObj[336]];
      this.symbol = dataObj[30001];
    }
  }
}

// init cron
class InitialMarketIndex {
  constructor(dataObj) {
    {
      this.received_at = getLocalDate();
      this.market = dataObj.market;
      this.index_type_code = dataObj.index_type_code;
      this.market_index_class = dataObj.market_index_class;
      this.index_name = dataObj.index_name;
      this.index_name_en = dataObj.index_name_en;
      this.total_msg_no = dataObj.total_msg_no;
      this.symbols = dataObj.symbols;

      this.trading_session_id = 99;
      this.trading_session = TRADING_SESSION[99];

      this.value_index = dataObj.value_index;
      this.prior = dataObj.value_index;
      this.total_value = 0;
      this.total_volume = 0;

      this.ceiling_count = 0; // Số chứng khoán có giá trần
      this.floor_count = 0; //Số chứng khoán có giá sàn
      this.nochange_count = 0; // Số chứng khoán có giá không đổi
      this.up_count = 0; // Số chứng khoán có giá tăng
      this.down_count = 0; // Số chứng khoán có giá giảm
      this.changed = 0.0;
      this.percent_changed = 0.0;
    }
  }
}

// Put through
class PutThroughExchange {
  constructor(dataObj) {
    this.received_at = getLocalDate();
    this.trade_date = dataObj[75];
    this.transact_time = dataObj[60];
    this.total_volume_traded = +dataObj[387];
    this.gross_trade_amt = parseFloat(dataObj[381]);
    this.sell_tot_order_qty = +dataObj[30521];
    this.buy_tot_order_qty = +dataObj[30522];
    this.sell_valid_order_cnt = +dataObj[30523];
    this.buy_valid_order_cnt = +dataObj[30524];
    this.price = +dataObj[270];
    this.volume = +dataObj[271];
    this.number_of_orders = +dataObj[346];
    this.exchange = mappingPutThroughMarketExchange[dataObj[30001]];
    this.symbol = dataObj[55];
    this.market = dataObj[30001];
    this.mes_seq_num = dataObj[34];
  }
}

module.exports = {
  SecurityDefinition,
  ForeignerOrderLimit,
  IndexConstituentsInformation,
  IndexRealtime,
  SecurityStatus,
  InitialMarketIndex,
  PutThroughExchange,
};
