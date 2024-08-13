module.exports = {
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.js'],
};
