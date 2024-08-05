# Thuvaragan Sabesan - Ignite Assessment (Back-end) - Swivel

## Project Description

This backend project serves as the foundation for CRUD operations through APIs. It leverages **Express.js** for the server-side framework and **Node.js** for the runtime environment. **MongoDB** is used as the database, with **Mongoose** as the ODM (Object Data Modeling) library. This backend is designed to integrate seamlessly with a frontend/UI project, providing robust API endpoints for data manipulation and retrieval.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:
    ```bash
    cd <repository-directory>
    ```

3. **Install the required dependencies**:
    ```bash
    npm install
    ```

## Usage

To run the project, use the following command in your terminal:

```bash
npm start
```
This will start the Express server. You can access the server locally at http://localhost:8000.

## Technologies Used

**Node.js**: JavaScript runtime environment
**Express.js**: Web framework for Node.js
**MongoDB**: NoSQL database
**Mongoose**: ODM library for MongoDB
**Jest**: Testing framework

## API Documentation

The backend provides the following CRUD operations via API calls:

**Create an Employee**: POST /api/employees
**Retrieve All Employees**: GET /api/employees
**Retrieve a Single Employee**: GET /api/employees/:id
**Update an Employee**: PUT /api/employees/:id
**Delete an Employee**: DELETE /api/employees/:id

Please refer to the Swagger documentation for detailed information on each endpoint.

## Running Tests

To run the tests, execute the following command in your terminal:

```bash
npm test
```

This command will run all the test cases defined in the project.