const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { db: dbConfig } = require('../configs/config');

const config = dbConfig.default;
const basename = path.basename(__filename);
const db = {};

/** @type {import('sequelize').Sequelize} */
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
