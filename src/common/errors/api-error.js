class ApiError extends Error {
  constructor(statusCode, message, errorPayload = undefined, isOperational = true, stack = '') {
    super(message);
    this.errorPayload = errorPayload;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
