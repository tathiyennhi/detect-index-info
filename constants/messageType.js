const MESSAGE_TYPE = {
  D: "d",
  M1: "M1",
  ML: "ML",
  F: "f",
  X: "X",
  M7: "M7",
  MT: "MT",
};

const MARKET_NAME = {
  STO: "STO",
  STX: "STX",
  BDO: "BDO",
  BDX: "BDX",
  DVX: "DVX",
  HCX: "HCX",
  UPX: "UPX",
  RPO: "RPO",
  STO_ODD: "STO_ODD",
  STX_ODD: "STX_ODD",
  UPX_ODD: "UPX_ODD",
  CW: "CW",
  STO_BUY_IN: "STO_BUY_IN",
  STX_BUY_IN: "STX_BUY_IN",
  UPX_BUY_IN: "UPX_BUY_IN",
};

const BOARD_ID = {
  G1: "G1", // Chính (Main)
  G2: "G2", // Trước giờ giao dịch (Pre Open)
  G3: "G3", // Sau giờ giao dịch (Post Close)
  G4: "G4", // Lô lẻ (Odd lot)
  G7: "G7", // Mua bắt buộc (Buy-in)
  G8: "G8", // Bán bắt buộc (Sell-out)
  T1: "T1", // Thỏa thuận (regular)
  T4: "T4", // Thỏa thuận lô lẻ(regular for Odd lot)
  T2: "T2", // Thỏa thuận trước giờ giao dịch (pre)
  T3: "T3", // Thỏa thuận sau giờ giao dịch (post)
  T6: "T6", // Thỏa thuận sau giờ giao dịch cho lô lẻ (post for Odd lot)
  R1: "R1", // Thỏa thuận (Repo)
  AL: "AL", // Tất cả các Board
};

const SECURITY_TYPE = {
  EW: "EW",
  ST: "ST",
};

const UNDERLYING_PRICE_CHANGED = {
  UP: "up",
  DOWN: "down",
  CEILING: "ceiling",
  FLOOR: "floor",
  NO_CHANGE: "nochange",
};

module.exports = {
  MESSAGE_TYPE,
  MARKET_NAME,
  BOARD_ID,
  SECURITY_TYPE,
  UNDERLYING_PRICE_CHANGED,
};
