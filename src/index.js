const app = require('./app');
const logger = require('./common/logger');
const config = require('./configs/config');

const server = app.listen(config.app.port, () => {
  logger.info(`App Listening to port ${config.app.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('App Closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
