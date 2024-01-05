const { default: mongoose } = require("mongoose");

const SecuritiesSchema = new mongoose.Schema(
  {
    received_at: { type: String },
    market: { type: String },
    board: { type: String },
    name: { type: String },
    name_en: { type: String },
    id: { type: String },
    symbol: { type: String },
    ticker_code: { type: String },
    type: { type: String },
    floor: { type: Number },

    ceiling: { type: Number },
    prior: { type: Number },

    bp3: { type: Number, required: false },
    bv3: { type: Number, required: false },
    bp2: { type: Number, required: false },
    bv2: { type: Number, required: false },
    bp1: { type: Number, required: false },
    bv1: { type: Number, required: false },
    mp: { type: Number, required: false },
    mv: { type: Number, required: false },
    changed: { type: Number, required: false },
    changed_percent: { type: Number, required: false },
    ap1: { type: Number, required: false },
    av1: { type: Number, required: false },
    ap2: { type: Number, required: false },
    av2: { type: Number, required: false },
    ap3: { type: Number, required: false },
    av3: { type: Number, required: false },

    highest: { type: Number, required: false },
    lowest: { type: Number, required: false },

    mp: { type: Number, required: false },
    mv: { type: Number, required: false },
    open: { type: Number },
    total_volume: { type: Number, required: false },
    fb_volume: { type: Number, required: false },
    fs_volume: { type: Number, required: false },
    f_room: { type: Number, required: false },
    f_total_room: { type: Number, required: false },

    // for EW
    ref_ticker_code: { type: String },
    issuer: { type: String },
    last_trading_date: { type: String },
    conversion_ratio: { type: Number },
    strike_price: { type: Number },
    underlying_price: { type: Number }, // prior || realtime matched price of us
    underlying_price_changed: { type: String },

    underlying_ceiling: Number,
    underlying_floor: Number,
  },
  { timestamps: true }
);

const SecuritiesModel = mongoose.model("security", SecuritiesSchema);

module.exports = { SecuritiesModel };
