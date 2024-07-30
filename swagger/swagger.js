// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation.',
    },
  },
  apis: ['./routes/crudRoutes.js'], // Path to your API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerUi };