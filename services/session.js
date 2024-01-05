const { SessionModel } = require("../database/models/marketSession");
const logger = require("../utils/logger");
const _ = require("lodash");

async function updateSession(data) {
  try {
    const result = await SessionModel.findOneAndUpdate(
      { market: data.market },
      { $set: _.omit(data, ["received_at", "_id", "__v"]) },
      { upsert: true, new: true },
    ).lean();
    return result;
  } catch (error) {
    logger.error("updateSession ERROR: ", error.message);
  }
}

module.exports = { updateSession };