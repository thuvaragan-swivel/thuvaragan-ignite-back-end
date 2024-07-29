// appConfig.test.js

describe("Configuration Tests", () => {
  beforeAll(() => {
    // Mocking the server port.
    process.env.SERVER_PORT = "8000";
  });

  afterAll(() => {
    // Restoring the env var to its original state.
    delete process.env.SERVER_PORT;
  });

  test("should read port from environment variables", () => {
    // Reset the module registry before requiring the configuration module.
    jest.resetModules();
    const config = require("../config/appConfig");
    expect(config.appConfig.port).toBe("8000");
  });
});
