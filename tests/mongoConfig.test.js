// mongoConfig.test.js

import mongoose from "mongoose";
import connectDB from "../config/mongoConfig.js";
import logger from "../config/loggerConfig.js";

// Mocking the mongoose and logger modules.
jest.mock("mongoose");
jest.mock("../config/loggerConfig.js");

describe("MongoDB Configuration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clearing previous mock calls.
  });

  it("should connect to MongoDB successfully", async () => {
    // Mocking the successful connection.
    mongoose.connect.mockResolvedValueOnce();

    // Mocking the logger methods.
    logger.info.mockImplementation(() => {});
    logger.error.mockImplementation(() => {});

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URL);
    expect(logger.info).toHaveBeenCalledWith(
      "MongoDB Database has been Connected Successfully."
    );
  });

  it("should handle MongoDB connection errors", async () => {
    // Mocking the connection error.
    mongoose.connect.mockRejectedValueOnce(new Error("Connection error"));

    // Mocking the logger methods.
    logger.info.mockImplementation(() => {});
    logger.error.mockImplementation(() => {});

    // Using expect().rejects to handle the async error.
    await expect(connectDB()).rejects.toThrow("Connection error");

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URL);
    expect(logger.error).toHaveBeenCalledWith(
      "Error connecting to MongoDB: Connection error."
    );
  });
});
