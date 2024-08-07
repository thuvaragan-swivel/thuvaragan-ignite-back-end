import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
  throw new Error("MONGODB_URL environment variable is not defined.");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDB;
