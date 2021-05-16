module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  setupFiles: ['./tests/setupEnv.js'],
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/configs', 'src/common', 'src/app.js', 'src/models/index.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
