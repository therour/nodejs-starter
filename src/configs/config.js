const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = require('./app');
const db = require('./db');

module.exports = {
  app,
  db,
};
