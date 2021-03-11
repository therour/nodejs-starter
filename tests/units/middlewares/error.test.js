const httpStatus = require('http-status');
const ApiError = require('../../../src/common/errors/api-error');
const logger = require('../../../src/common/logger');
const config = require('../../../src/configs/config');
const errorMiddleware = require('../../../src/middlewares/error');
const { mockRequest, mockResponse } = require('../../utils/mocks');

describe('Error Middleware', () => {
  describe('Error Handler', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation(() => {});
    });

    test('Should send proper error response and put the error message in res.locals', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any 400 Error');
      const res = mockResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorMiddleware(error, mockRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
          stack: error.stack,
        })
      );
      expect(res.locals.errorMessage).toBe(error.message);
    });

    test('Should send 500 error response on native error', () => {
      const error = new Error('500 error');
      const res = mockResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorMiddleware(error, mockRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          stack: error.stack,
        })
      );
      expect(res.locals.errorMessage).toBe(error.message);
    });

    test('Should hide stack and original error message of native error on production', () => {
      config.app.env = 'production';
      const error = new Error('500 error');
      const res = mockResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorMiddleware(error, mockRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.not.objectContaining({
          stack: expect.anything(),
        })
      );
      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        })
      );
    });
  });
});
