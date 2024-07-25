// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import fs from "fs";
// import expressRoute from "./routes/crud-routes.js";
// import cors from "cors";

// const expressApp = express();

// expressApp.use(cors());

// expressApp.use(bodyParser.json());
// dotenv.config();

// // Constants for the MongoDB Connection, Server Port, & Data Log Document.
// const MONGO_URL = process.env.MONGODB_URL;
// const PORT = process.env.SERVER_PORT;
// const LOG_DATA = process.env.LOG_FILE;

// const logMessage = (message) => {
//   fs.appendFile(
//     LOG_DATA,
//     `${new Date().toISOString()} - ${message}\n`,
//     (err) => {
//       if (err) throw err;
//     }
//   );
// };

// // Connecting to the MongoDB Database, and starting the Express Server.
// mongoose
//   .connect(MONGO_URL)
//   .then(() => {
//     logMessage("MongoDB Database has been connected successfully.");
//     expressApp.listen(PORT, () => {
//       logMessage(`Express Server is running on Port ${PORT}.\n`);
//     });
//   })
//   .catch((error) => logMessage(`Error: ${error.message}`));

// // Setting up the Express Routes.
// expressApp.use("/api", expressRoute);



import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import logger from './config/logger.js';
import expressRoute from './routes/crud-routes.js';

dotenv.config();

const expressApp = express();
const PORT = process.env.SERVER_PORT;

expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use('/api', expressRoute);

const startExpressServer = async () => {
  await connectDB();
  expressApp.listen(PORT, () => {
    logger.info(`Express Server is running on Port ${PORT}.\n`);
  });
};

startExpressServer();
