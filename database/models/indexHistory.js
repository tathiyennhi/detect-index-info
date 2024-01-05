const mongoose = require('mongoose');

const IndexHistoryInfoSchema = new mongoose.Schema(
  {
    time: Number,
    value_indexes: Number,
    index: Number,
    value: Number,
    volume: Number,
    mes_seq_num: Number,
  },
  { _id: false, _v: false },
);

const IndexHistorySchema = new mongoose.Schema(
  {
    market: String,
    received_at: String,
    symbol: String,
    index_type_code: String,
    index_history: [IndexHistoryInfoSchema],
  },
  { timestamps: true },
);

const IndexHistoryModel = mongoose.model('index_history', IndexHistorySchema);

module.exports = IndexHistoryModel;
