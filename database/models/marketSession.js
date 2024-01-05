const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  received_at: { type: String },
  market: { type: String, required: true },
  board: { type: String, required: true },
  board_event_id: String,
  board_event: String,
  sess_open_close_code: String,
  trading_session_id: String,
  trading_session: String,
});

const SessionModel = mongoose.model("session", SessionSchema);

module.exports = {
  SessionModel,
};
