process.env.LOG_FILE = "test.log";

import logger from "../config/loggerConfig";

describe("Logger Config", () => {
  it("should create a logger", () => {
    expect(logger).toBeDefined();
  });
});
