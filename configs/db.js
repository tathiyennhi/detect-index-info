require("dotenv").config();

const dbConfig = {
  mongo: {
    url: process.env.MONGO_CONNECTION_STRING,
  },
  redisDb: {
    indexDb: process.env.REDIS_INDEX_CONNECTION_STRING,
    securitiesDb: process.env.REDIS_SECURITIES_CONNECTION_STRING,
    securitiesHistoryDb: process.env.REDIS_SECURITIES_HISTORY_CONNECTION_STRING,
  },
};

module.exports = dbConfig;
