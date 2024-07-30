import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoConfig.js";
import logger from "./config/loggerConfig.js";
import expressRouter from "./routes/crudRoutes.js";
import { swaggerDocs, swaggerUi } from "./swagger/swagger.js";

dotenv.config();

const expressApp = express(); // Creating an instance of Express application.
const PORT = process.env.SERVER_PORT; // Getting the server port.

// Middleware configuration.
expressApp.use(cors()); // Enabling CORS for all routes.
expressApp.use(bodyParser.json()); // Parsing JSON bodies for incoming requests.
expressApp.use("/api", expressRouter); // Using the routes defined in the crudRoutes.js file.

expressApp.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Using Swagger for API Documentation.

// Function to start the Express server.
// It connects to the MongoDB database and then starts the server.
const startExpressServer = async () => {
  try {
    logger.info(`Starting Express Server on Port ${PORT}.`);
    await connectDB(); // Connecting to the MongoDB database.
    expressApp.listen(PORT, () => {
      logger.info(`Express Server is running on Port ${PORT}.\n`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}.`);
  }
};

// Exporting the function to start the server.
export default startExpressServer();
