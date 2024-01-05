const indexHandler = require('./indexHandler');
const indexHistoryHandler = require('./indexHistoryHandler');

module.exports = { ...indexHandler, ...indexHistoryHandler };
