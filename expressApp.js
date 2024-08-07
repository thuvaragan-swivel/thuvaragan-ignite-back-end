import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import expressRouter from "./routes/crudRoutes.js";
import { swaggerDocs, swaggerUi } from "./swagger/swagger.js";

dotenv.config();

const expressApp = express(); // Creating an instance of Express application.

// Disable the 'X-Powered-By' header.
expressApp.disable('x-powered-by');

// Middleware configuration.
const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only the needed methods.
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowing only the headers needed.
};

expressApp.use(cors(corsOptions)); // Enabling CORS.
expressApp.use(bodyParser.json()); // Parsing JSON bodies for incoming requests.
expressApp.use("/api", expressRouter); // Using the routes defined in the crudRoutes.js file.

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

const options = {
customCssUrl: CSS_URL,
};

expressApp.use('/api-docs', swaggerUi.serveFiles(swaggerDocs, options), swaggerUi.setup(swaggerDocs, options)); // Using Swagger for API Documentation.

export default expressApp;
