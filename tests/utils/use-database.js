const { umzug, sequelize } = require('./database');

const defaultOptions = {
  seeder: false,
};

/**
 * YOU SHOULD RUN TEST SEQUENTIALLY IF YOU ARE USING THIS UTILS
 * Adding --runInBand to jest command will do the job
 */
module.exports = function useDatabase(options = defaultOptions) {
  beforeEach(async () => {
    await umzug.migration().up();
    if (options.seeder) {
      await umzug.seeder().up();
    }
  });

  afterEach(async () => {
    await umzug.migration().down({ to: 0 });
  });

  afterAll(async () => {
    await sequelize.close();
  });
};
