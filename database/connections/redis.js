const { createClient } = require('redis');
const config = require('../../configs');

const redisIndex = createClient({ url: config.redisDb.indexDb });

(async () => {
  await redisIndex.connect();
})();

redisIndex.on('connect', () => {
  console.info('Connect Redis successfully');
});

redisIndex.on('error', (err) => {
  console.error('Redis client error', err);
});

module.exports = { redisIndex };
