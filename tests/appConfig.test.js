// config.test.js

describe('Configuration Tests', () => {
  beforeAll(() => {
    // Mock the environment variables
    process.env.SERVER_PORT = '8000';
  });

  afterAll(() => {
    // Restore the environment variables to their original state
    delete process.env.SERVER_PORT;
  });

  test('should read port from environment variables', () => {
    // Reset the module registry before requiring the configuration module
    jest.resetModules();
    const config = require('../config/appConfig');
    expect(config.appConfig.port).toBe('8000');
  });
});
