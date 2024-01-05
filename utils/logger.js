const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, printf, timestamp } = format;
const fs = require("fs");
const path = require("path");
const logDirectory = process.env.LOG_DIRECTORY || "logs";

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = createLogger({
  exitOnError: false,
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    silly: 2,
    warn: 1,
    error: 0,
  },
  format: combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    printf((info) => {
      const splat = info[Symbol.for('splat')];
      if (splat) {
        return `[${info.timestamp}]-[${info.level}] ${info.message} - meta: ${JSON.stringify(splat[0])}`;
      }
      return `[${info.timestamp}]-[${info.level}] ${info.message} `;
    }),
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
    new transports.DailyRotateFile({
      level: 'error',
      filename: path.join(logDirectory, '%DATE%_error.log'),
      datePattern: 'YYYY-MM-DD',
      prepend: true,
    }),
    new transports.DailyRotateFile({
      level: 'trace',
      filename: path.join(logDirectory, '%DATE%_kafka_produce.log'),
      datePattern: 'YYYY-MM-DD',
      prepend: true,
    }),
  ],
});

module.exports = logger;
