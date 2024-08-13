import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
      description: "A Simple Express API with Swagger Documentation.",
    },
  },
  apis: ["src/routes/crudRoutes.js"], // Path to the API routes.
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
