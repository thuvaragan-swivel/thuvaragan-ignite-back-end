import mongoose from "mongoose";
import connectDB from "../config/mongoConfig.js";

// Mocking the mongoose and logger modules.
jest.mock("mongoose");

describe("MongoDB Configuration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clearing previous mock calls.
  });

  it("should connect to MongoDB successfully", async () => {
    // Mocking the successful connection.
    mongoose.connect.mockResolvedValueOnce();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URL);
  });

  it("should handle MongoDB connection errors", async () => {
    // Mocking the connection error.
    mongoose.connect.mockRejectedValueOnce(new Error("Connection error"));

    // Using expect().rejects to handle the async error.
    await expect(connectDB()).rejects.toThrow("Connection error");

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URL);
  });
});
