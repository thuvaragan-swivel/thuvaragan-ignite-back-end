# Thuvaragan Sabesan - Ignite Assessment (Back-end) - Swivel
Project Description
This backend project serves as the foundation for CRUD operations through APIs. It leverages Express.js for the server-side framework and Node.js for runtime environment. MongoDB is used as the database, with Mongoose as the ODM (Object Data Modeling) library. This backend is designed to integrate seamlessly with a frontend/UI project, providing robust API endpoints for data manipulation and retrieval.

Installation
To get started with this project, follow these steps:
Clone the repository: git clone <repository-url>
Navigate to the project directory: cd <repository-directory>
Install the required dependencies:npm install

Usage
To run the project, use the following command in your terminal:npm start
This will start the Express server. You can access the server locally at http://localhost:8000.

Technologies Used
Node.js: JavaScript runtime environment
Express.js: Web framework for Node.js
MongoDB: NoSQL database
Mongoose: ODM library for MongoDB
Jest: Testing framework
API Documentation
CRUD Operations
Create

Endpoint: POST /api/resource
Description: Create a new resource.
Request Body: JSON object representing the new resource.
Read

Endpoint: GET /api/resource/:id
Description: Retrieve a resource by its ID.
Parameters: id - The ID of the resource.
Update

Endpoint: PUT /api/resource/:id
Description: Update an existing resource by its ID.
Request Body: JSON object representing the updated resource.
Parameters: id - The ID of the resource.
Delete

Endpoint: DELETE /api/resource/:id
Description: Delete a resource by its ID.
Parameters: id - The ID of the resource.

Running Tests
To run the tests for this project, use the following command:npm test
This will execute the test suite using Jest, providing feedback on code functionality and coverage.