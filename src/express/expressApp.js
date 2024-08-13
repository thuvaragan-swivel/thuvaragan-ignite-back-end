import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import expressRouter from "../routes/crudRoutes.js";
import { swaggerDocs, swaggerUi } from "../swagger/swagger.js";

dotenv.config();

const expressApp = express(); // Creating an instance of Express application.

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"; // Defining the Swagger UI CSS Output.

// Disable the 'X-Powered-By' header.
expressApp.disable("x-powered-by");

// Middleware configuration.
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only the needed methods.
  allowedHeaders: ["Content-Type", "Authorization"], // Allowing only the headers needed.
};

expressApp.use(cors(corsOptions)); // Enabling CORS.
expressApp.use(bodyParser.json()); // Parsing JSON bodies for incoming requests.
expressApp.use("/api", expressRouter); // Using the routes defined in the crudRoutes.js file.

// Using Swagger for API Documentation.
expressApp.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

export default expressApp;
