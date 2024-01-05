const mongoose = require("mongoose");
const {
  PUT_THROUGH_MARKET,
  PUT_THROUGH_EX_TYPE,
} = require("../../constants/putThrough");

const PutThroughSchema = new mongoose.Schema(
  {
    // board: { type: String, required: true },
    market: { type: String, required: true },
    exchange: {
      type: String,
      required: true,
      enum: Object.values(PUT_THROUGH_MARKET),
    },
    received_at: { type: String },
    id: String,
    symbol: { type: String, required: true },
    ticker_code: { type: String },

    floor: Number,
    ceiling: Number,
    prior: Number,
    trade_date: String,
    transact_time: String,

    total_volume_traded: Number,
    gross_trade_amt: Number,
    sell_tot_order_qty: Number,
    buy_tot_order_qty: Number,
    sell_valid_order_cnt: Number,
    buy_valid_order_cnt: Number,
    received_at_in_ms: Number,
    price: { type: Number, required: true },
    volume: { type: Number, required: true },
    number_of_orders: Number,
    mes_seq_num: Number,

    exchange_type: { type: String, enum: Object.values(PUT_THROUGH_EX_TYPE) },
  },
  { timestamps: true }
);

const PutThroughModel = mongoose.model("put_through", PutThroughSchema);
PutThroughModel.createIndexes({ transact_time: -1 });

module.exports = { PutThroughModel };
