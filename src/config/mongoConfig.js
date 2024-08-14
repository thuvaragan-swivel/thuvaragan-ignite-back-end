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
    logger.info(`Attempting to connect to MongoDB URL.`);
    await mongoose.connect(MONGO_URL);
    logger.info("MongoDB Database has been Connected Successfully.");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}.`);
    throw new Error(error.message);
  }
};

export default connectDB;
