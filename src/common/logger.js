const winston = require('winston');
const config = require('../configs/config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }

  return info;
});

const logger = winston.createLogger({
  level: config.app.env === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.app.env === 'production' ? winston.format.uncolorize() : winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message, meta }) => `${level}: ${message} - \n${JSON.stringify({ ...meta })}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
