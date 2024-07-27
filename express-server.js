import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo-config.js";
import logger from "./config/logger-config.js";
import expressRouter from "./routes/crud-routes.js";

dotenv.config();

const expressApp = express();
const PORT = process.env.SERVER_PORT;

expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use("/api", expressRouter);

const startExpressServer = async () => {
  try {
    logger.info(`Starting Express Server on Port ${PORT}.`);
    await connectDB();
    expressApp.listen(PORT, () => {
      logger.info(`Express Server is running on Port ${PORT}.\n`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}.`);
  }
};

startExpressServer();
