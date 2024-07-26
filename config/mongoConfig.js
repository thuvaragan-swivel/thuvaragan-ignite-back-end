import mongoose from "mongoose";
import logger from "./loggerConfig.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
  throw new Error("MONGODB_URL environment variable is not defined.");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    logger.info("MongoDB Database has been connected successfully.");
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
