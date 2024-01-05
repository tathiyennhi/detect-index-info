const logger = require("../utils/logger");

const respond = (res, status, data, error) => {
  if (error) {
    logger.error("API Error:", error.message);
    res.status(status || 500).json({
      status: status || 500,
      error: error.message || "Internal server error",
    });
  } else {
    res
      .status(status || 200)
      .json({ status: status || 200, data: data ? data : {} });
  }
};

module.exports = { respond };
