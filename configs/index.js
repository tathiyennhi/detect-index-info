require('dotenv').config();
const dbConfig = require('./db');
const sftpFileConfig = require('./sftp');
const mddsConfig = require('./mddsGateway');
// const kafkaConfig = require("./kafka");

module.exports = {
  ...dbConfig,
  ...sftpFileConfig,
  ...mddsConfig,
  // ...kafkaConfig,
};
