const { default: mongoose } = require("mongoose");

const MatchInfoSchema = new mongoose.Schema({
  trading_time: { type: String },
  mp: { type: Number },
  mv: { type: Number },
  changed_percent: { type: Number },
  changed: { type: Number },
  bid: { type: Number },
  ask: { type: Number },
  side: { type: String },
  mes_seq_num: Number,
});

const MatchPriceHistorySchema = new mongoose.Schema({
  received_at: { type: String },
  symbol: { type: String },
  market: { type: String },
  matchInfo: [MatchInfoSchema],
});

const MatchPriceHistoryModel = mongoose.model(
  "match_price_history",
  MatchPriceHistorySchema
);

module.exports = { MatchPriceHistoryModel };
