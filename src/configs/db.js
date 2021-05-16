module.exports = {
  default: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,

    // only used when dialect is sqlite
    storage: process.env.DB_DATABASE,

    // enable logging
    logging: process.env.DB_LOG === 'true',
  },
};
