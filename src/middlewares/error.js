const httpStatus = require('http-status');
const ApiError = require('../common/errors/api-error');
const logger = require('../common/logger');
const config = require('../configs/config');

const convertError = (err) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    /* istanbul ignore next */
    const message = err.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, undefined, false, error.stack);
  }
  return error;
};

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const error = convertError(err);

  let { message } = error;
  const { statusCode, payload, stack } = error;
  if (config.app.env === 'production' && !error.isOperational) {
    message = httpStatus[statusCode];
  }

  res.locals.errorMessage = message;

  if (!error.isOperational) {
    logger.error(error);
  }

  const response = {
    code: statusCode,
    message,
    errors: payload,
    ...(config.app.env !== 'production' && { stack }),
  };

  res.status(statusCode).send(response);
};

module.exports = errorMiddleware;
