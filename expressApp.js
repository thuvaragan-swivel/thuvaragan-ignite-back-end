import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import expressRouter from "./routes/crudRoutes.js";
import { swaggerDocs, swaggerUi } from "./swagger/swagger.js";

dotenv.config();

const expressApp = express(); // Creating an instance of Express application.

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

const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
const css = fs.readFileSync(
  path.resolve(__dirname, "../node_modules/swagger-ui-dist/swagger-ui.css"),
  "utf8"
);

swaggerDocs = YAML.parse(file);
const options = {
  customCss: css,
};

expressApp.use(
  "/api-docs",
  express.static("node_modules/swagger-ui-dist"),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, options)
); // Using Swagger for API Documentation.

export default expressApp;
