const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    symbols: [String],
    ticker_codes: [String],
  },
  { timestamps: true },
);

const SectorModel = mongoose.model('sector', SectorSchema);

module.exports = SectorModel;
