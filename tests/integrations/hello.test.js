const httpStatus = require('http-status');
const request = require('supertest');
const app = require('../../src/app');

describe('Hello Route', () => {
  describe('GET /hello', () => {
    test('Should return OK and json with message', async () => {
      const res = await request(app).get('/hello').expect(httpStatus.OK);

      expect(res.body.message).toBe('Hello World!');
    });
  });
});
