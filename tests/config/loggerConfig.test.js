process.env.LOG_FILE = "test.log";

import logger from "../../src/config/loggerConfig.js";

describe("Logger Config", () => {
  it("should create a logger", () => {
    expect(logger).toBeDefined();
  });
});
