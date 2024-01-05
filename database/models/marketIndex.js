const mongoose = require("mongoose");

const MarketIndexSchema = new mongoose.Schema(
  {
    // ML & init
    received_at: { type: String },
    market: { type: String },
    market_index_class: { type: String },
    index_type_code: { type: String },
    index_name: { type: String },
    index_name_en: { type: String },
    total_msg_no: Number,
    symbols: { type: [String], default: [] },
    prior: { type: Number },

    // M1
    value_index: { type: Number },
    total_value: { type: Number, default: 0 },
    total_volume: { type: Number, default: 0 },
    changed: { type: Number, default: 0.00 },
    percent_changed: { type: Number, default: 0.00 },
    up_count: { type: Number, default: 0 },
    down_count: { type: Number, default: 0 },
    ceiling_count: { type: Number, default: 0 },
    floor_count: { type: Number, default: 0 },
    nochange_count: { type: Number, default: 0 },
    transact_time: { type: String },
    trading_session_id: String,
    trading_session: String,
  },
  { timestamps: true }
);

const MarketIndexModel = mongoose.model("market_index", MarketIndexSchema);

module.exports = {
  MarketIndexModel,
};
