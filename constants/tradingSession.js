const TRADING_SESSION = {
  '01': 'GT_ORDER_LOAD',
  10: 'OPENING_CALL_AUCTION',
  11: 'OPENING_CALL_AUCTION_EXTENSION',
  20: 'CALL_AUCTION_AFTER_HALT',
  21: 'CALL_AUCTION_AFTER_HALT_EXTENSION',
  30: 'CLOSING_CALL_AUCTION',
  40: 'CONTINUOUS_AUCTION',
  50: 'VI_CALL_AUCTION',
  51: 'VI_CALL_AUCTION_EXTENSION',
  60: 'ORDER_ACCEPT_ONLY',
  80: 'PERIODIC_CALL_AUCTION',
  90: 'TRADING_HALT',
  99: 'BOARD_CLOSING',
};

const MAPPING_TRADING_SESSION = {
  GT_ORDER_LOAD: 'LO',
  OPENING_CALL_AUCTION: 'ATO',
  OPENING_CALL_AUCTION_EXTENSION: 'OPENING_CALL_AUCTION_EXTENSION',
  CALL_AUCTION_AFTER_HALT: 'CALL_AUCTION_AFTER_HALT',
  CALL_AUCTION_AFTER_HALT_EXTENSION: 'CALL_AUCTION_AFTER_HALT_EXTENSION',
  CLOSING_CALL_AUCTION: 'ATC',
  CONTINUOUS_AUCTION: 'Cont.Matching',
  VI_CALL_AUCTION: 'Call auction',
  VI_CALL_AUCTION_EXTENSION: 'Call Auction Extension',
  ORDER_ACCEPT_ONLY: 'Order Accept Only',
  PERIODIC_CALL_AUCTION: 'Periodic Call Auction',
  TRADING_HALT: 'Trading Halt',
  BOARD_CLOSING: 'Closed',
  CLOSED: 'Closed',
};

module.exports = { TRADING_SESSION, MAPPING_TRADING_SESSION };
