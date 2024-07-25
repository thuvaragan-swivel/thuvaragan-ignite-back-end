import mongoose from 'mongoose';
import logger from './server-logger.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    logger.info('MongoDB Database has been connected successfully.');
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
