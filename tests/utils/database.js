const Umzug = require('umzug');
const path = require('path');
const { sequelize, Sequelize } = require('../../src/models/index');

const umzug = (type = 'migrations') =>
  new Umzug({
    migrations: {
      path: path.join(__dirname, `../../database/${type}`),
      params: [sequelize.getQueryInterface(), Sequelize],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize,
    },
    logging: false,
  });

let migration = null;
let seeder = null;

module.exports = {
  umzug: {
    /** @returns {import('umzug').Umzug} */
    migration: () => {
      if (!migration) {
        migration = umzug('migrations');
      }

      return migration;
    },
    /** @returns {import('umzug').Umzug} */
    seeder: () => {
      if (!seeder) {
        seeder = umzug('seeders');
      }

      return seeder;
    },
  },
  sequelize,
};
