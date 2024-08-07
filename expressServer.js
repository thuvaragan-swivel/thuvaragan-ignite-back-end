import expressApp from "./expressApp.js";
import connectDB from "./config/mongoConfig.js";

const PORT = process.env.SERVER_PORT; // Getting the server port.

// Function to start the Express server.
// It connects to the MongoDB database and then starts the server.
const startExpressServer = async () => {
  try {
    await connectDB(); // Connecting to the MongoDB database.
    expressApp.listen(PORT, () => {
    });
  } catch (error) {
  }
};

startExpressServer();
