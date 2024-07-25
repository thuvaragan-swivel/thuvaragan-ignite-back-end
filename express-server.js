import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb-database.js";
import logger from "./config/server-logger.js";
import expressRoute from "./routes/crud-routes.js";

dotenv.config();

const expressApp = express();
const PORT = process.env.SERVER_PORT;

expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use("/api", expressRoute);

const startExpressServer = async () => {
  await connectDB();
  expressApp.listen(PORT, () => {
    logger.info(`Express Server is running on Port ${PORT}.\n`);
  });
};

startExpressServer();
