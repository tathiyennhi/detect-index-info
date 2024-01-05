const { MARKET_NAME } = require('../constants/messageType');

function mapData(stocks) {
  return stocks
    .map((stock) => {
      const divv = stock.market === MARKET_NAME.DVX ? 1 : 1000;
      return {
        ...stock,
        ceiling: stock.ceiling / divv,
        floor: stock.floor / divv,
        prior: stock.prior / divv,

        bp3: stock.bp3 / divv,
        bp2: stock.bp2 / divv,
        bp1: stock.bp1 / divv,

        ap3: stock.ap3 / divv,
        ap2: stock.ap2 / divv,
        ap1: stock.ap1 / divv,
        mp: stock.mp / divv,
        highest: stock.highest / divv,
        lowest: stock.lowest / divv,
        changed: stock.changed / divv,
        symbol: stock.ticker_code,
        spec_symbol: stock.symbol,
        open: stock.open / divv,
      };
    })
    .sort((stock1, stock2) => stock1.symbol?.localeCompare(stock2.symbol));
}

function mapDataForCallAuction(stocks) {
  return stocks
    .map((stock) => {
      const divv = stock.market === MARKET_NAME.DVX ? 1 : 1000;
      return {
        ...stock,
        ceiling: stock.ceiling / divv,
        floor: stock.floor / divv,
        prior: stock.prior / divv,

        bp3: stock.bp3 / divv,
        bp2: stock.bp2 / divv,
        bp1: stock.bp1 / divv,

        ap3: stock.ap3 / divv,
        ap2: stock.ap2 / divv,
        ap1: stock.ap1 / divv,

        highest: stock.highest / divv,
        lowest: stock.lowest / divv,
        symbol: stock.ticker_code,
        spec_symbol: stock.symbol,
        open: stock.open / divv,

        mp: (stock.ex_mp || 0) / divv,
        mv: stock.ex_mv || 0,
        changed: (stock.ex_changed || 0) / divv || 0,
        changed_percent: stock.ex_changed_percent || 0,
      };
    })
    .sort((stock1, stock2) => stock1.symbol?.localeCompare(stock2.symbol));
}

function mapDataForAllStock(stock) {
  return {
    id: stock.id,
    market: stock.market,
    board: stock.board,
    name: stock.name,
    name_en: stock.name_en,
    symbol: stock.ticker_code,
    spec_symbol: stock.symbol,
    issuer: stock.issuer,
    type: stock.type,
    ticker_code: stock.ticker_code,
  };
}

module.exports = { mapData, mapDataForAllStock, mapDataForCallAuction };
