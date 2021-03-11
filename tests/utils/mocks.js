const httpMocks = require('node-mocks-http');

module.exports = {
  mockRequest: httpMocks.createRequest,
  mockResponse: httpMocks.createResponse,
};
