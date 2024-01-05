const EVENT_EMIT = {
  MATCH_PRICE: 'match_price_change', // GIA KHOP -> DUNG CHO WATCHLIST | CANDLE 1 DANH SACH MA~ XAC DINH
  CANDLE_MATCH_PRICE: 'match_price_change', // DUNG CHO tab candle chart
  PRICE_CHANGE: 'price_change', // 3 MUC GIA -> DUNG CHO WATCHLIST | CANDLE 1 DANH SACH MA~ XAC DINH
  WATCH_LIST_PRICE_CHANGE: 'price_change', // DUNG CHO SERVICE WATCHLIST MOI // tab wathlist

  MARKET_PRICE_CHANGE: 'stock_price_change', // GUI VE CHO TOAN` TAB HOSE | HNX | UPX
  INDEX_CHANGE: 'index_change', // THAY DOI INDEX, INDEX HISTORY VA SESSION
  SESSION_CHANGE: 'session_change', // THAY DOI SESSION
  INDEX_CHART: 'index_chart', // UPDATE INDEX CHART
  RESET_INDEX: 'reset_index', // RESET INDEX
};

const ROOMS = {
  // FOR STO, STX, ...
  SYMBOL_REAL_TIME_ROOM: "symbol_realtime_room",

  // FOR SECURITIES WATCHLIST
  JOIN_WATCH_LIST: "join_watch_list",
  LEAVE_WATCH_LIST: "leave_watch_list",
};

module.exports = {
  EVENT_EMIT,
  ROOMS,
};
