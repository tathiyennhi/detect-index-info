const PUT_THROUGH_EX_TYPE = {
  BID: "Bid",
  ASKED: "Asked",
  MATCHED: "Matched",
};

const PUT_THROUGH_MARKET = {
  HOSE: "hose",
  HNX: "hnx",
  UPCOM: "upcom",
};

const MAP_MARKET_ID_NAME = {
  STO: "hose",
  STX: "hnx",
  UPX: "upcom",
};

const mappingPutThroughMarketExchange = {
  STO: PUT_THROUGH_MARKET.HOSE,
  BDO: PUT_THROUGH_MARKET.HOSE,
  RPO: PUT_THROUGH_MARKET.HOSE,

  STX: PUT_THROUGH_MARKET.HNX,
  BDX: PUT_THROUGH_MARKET.HNX,
  DVX: PUT_THROUGH_MARKET.HNX,
  HCX: PUT_THROUGH_MARKET.HNX,

  UPX: PUT_THROUGH_MARKET.UPCOM,
};

module.exports = { PUT_THROUGH_EX_TYPE, PUT_THROUGH_MARKET, MAP_MARKET_ID_NAME, mappingPutThroughMarketExchange };
