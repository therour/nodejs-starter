const request = require('supertest');
const httpStatus = require('http-status');
const useDatabase = require('../utils/use-database');
const { User } = require('../../src/models');
const app = require('../../src/app');
const { sequelize } = require('../utils/database');

describe('User Routes', () => {
  useDatabase();
  describe('GET /users', () => {
    test('Should return OK and users data', async () => {
      const users = [
        {
          name: 'user 1',
          email: 'user1@example.com',
          password_hash: 'assumingthisishashed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'user 2',
          email: 'lain@example.com',
          password_hash: 'assumingthisishashed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await sequelize.getQueryInterface().bulkInsert('Users', users);

      const res = await request(app).get('/users').expect(httpStatus.OK);

      expect(res.body.data.length).toBe(2);
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: users[0].name,
            email: users[0].email,
          }),
          expect.objectContaining({
            name: users[1].name,
            email: users[1].email,
          }),
        ])
      );
    });
  });
});
