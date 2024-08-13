import expressApp from "./expressApp.js";
import connectDB from "../config/mongoConfig.js";
import logger from "../config/loggerConfig.js";

const PORT = process.env.SERVER_PORT; // Getting the server port.

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

startExpressServer();
