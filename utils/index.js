const { MARKET_NAME } = require("../constants/messageType");
const messageStandardize = require("./messageStandardize");

function preprocessData(newMessage) {
  const arraySplit = messageStandardize.normalizeString(newMessage.toString());
  const newArray = arraySplit.map((element) => element.split('='));

  const tempMap = new Map();
  newArray.forEach((element) => {
    if (!tempMap.has(element[0])) {
      tempMap.set(element[0], element[1]);
    } else {
      const tempArr = [tempMap.get(element[0])];
      tempArr.push(element[1]);
      tempMap.set(element[0], tempArr.flat());
    }
  });

  const obj = Object.fromEntries(tempMap);
  return obj;
}

function getKeySecurities({ symbol, board, market }) {
  return `SECURITY_${symbol}_${board}_${market}`;
}

function getKeySecuritiesByBoardMarket({ board, market }) {
  if (market == MARKET_NAME.CW) {
    return `SECURITY_*_${board}_STO`;
  } else if (market.toLowerCase() == 'put-through-sto') {
    return `SECURITY_*_*`;
  } else if (market.toLowerCase() == 'put-through-stx') {
    return `SECURITY_*_*`;
  } else if (market.toLowerCase() == 'put-through-upx') {
    return `SECURITY_*_*`;
  }
  return `SECURITY_*_${board}_${market}`;
}
function getKeySecuritiesWatchlist({ ticker_code, board, market }) {
  return `SECURITY_*${ticker_code}*_${board}_${market}`;
}

function isNumberFormat(str) {
  if (/^\d+$/.test(str)) {
    return true;
  }
  return false;
}

module.exports = {
  preprocessData,
  getKeySecurities,
  isNumberFormat,
  getKeySecuritiesByBoardMarket,
  getKeySecuritiesWatchlist,
};
