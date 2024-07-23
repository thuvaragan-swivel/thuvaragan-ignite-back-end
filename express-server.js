console.log("Express JS...");

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import expressRoute from "./routes/crud-routes.js";

// const express = require("express")
const expressApp = express();

expressApp.use(bodyParser.json());
dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;
const PORT = process.env.SERVER_PORT;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Database has been connected successfully.");
    expressApp.listen(PORT, () => {
      console.log(`Express Server is running on Port ${PORT}.`);
    });
  })
  .catch((error) => console.log(error));

expressApp.use("/api", expressRoute);
