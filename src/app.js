const express = require('express');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const morgan = require('./common/morgan');
const config = require('./configs/config');
const router = require('./routes/routes');
const ApiError = require('./common/errors/api-error');
const errorMiddleware = require('./middlewares/error');

const app = express();

// set morgan http logger
if (config.app.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security Http Headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xssClean());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/', router);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Endpoint Not Found'));
});

app.use(errorMiddleware);

module.exports = app;
