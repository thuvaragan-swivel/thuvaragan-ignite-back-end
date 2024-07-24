import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import expressRoute from "./routes/crud-routes.js";

const expressApp = express();

expressApp.use(bodyParser.json());
dotenv.config();

// Constants for the MongoDB Connection, Server Port, & Data Log Document.
const MONGO_URL = process.env.MONGODB_URL;
const PORT = process.env.SERVER_PORT;
const LOG_DATA = process.env.LOG_FILE;

const logMessage = (message) => {
  fs.appendFile(
    LOG_DATA,
    `${new Date().toISOString()} - ${message}\n`,
    (err) => {
      if (err) throw err;
    }
  );
};

// Connecting to the MongoDB Database, and starting the Express Server.
mongoose
  .connect(MONGO_URL)
  .then(() => {
    logMessage("MongoDB Database has been connected successfully.");
    expressApp.listen(PORT, () => {
      logMessage(`Express Server is running on Port ${PORT}.\n`);
    });
  })
  .catch((error) => logMessage(`Error: ${error.message}`));

// Setting up the Express Routes.
expressApp.use("/api", expressRoute);
