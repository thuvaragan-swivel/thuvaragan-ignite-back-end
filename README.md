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

## MongoDB Setup/ Configuration

To run the project, a MongoDB Database should be set for the backend API.  
This guide will walk you through setting up a MongoDB database using MongoDB Atlas and connecting it to your Express server.  

Before you begin, make sure you have the following installed:  

- Node.js
- npm
- An Express server setup

**Step 1**: Create a MongoDB Account (https://www.mongodb.com/)  
**Step 2**: Create a New Cluster  
**Step 3**: Configure Your Cluster
* Create a Database User
* Configure Network Access
    - Choose **Allow Access from Anywhere** to allow your local development environment to connect to the cluster.
* Create a Database
**Step 4**: Connect to Your Cluster
**Step 5**: Integrate MongoDB with Your Express Server
**Step 6**: Install the required dependencies (check package.json and proceed only if they don't exist in the project):
```bash
npm install mongoose dotenv
```
**Step 7**: Create a .env file in the root of your project directory and add the following:
```env
SERVER_PORT = 8000
MONGODB_URL = mongodb+srv://{USER_NAME}:{PASSWORD}@{CLUSTER_NAME}.mongodb.net/{DB_NAME}?retryWrites=true&w=majority&appName={APP_NAME}
```
**SERVER_PORT** -> The port that the local server is running on.  
**USER_NAME** -> The Database username you created in MongoDB Atlas.  
**PASSWORD** -> The password associated with the (USER_NAME).  
**CLUSTER_NAME** -> The cluster name in MongoDB Atlas.  
**DB_NAME** -> the name of the database you want to connect to.  
**APP_NAME** -> This is an optional parameter where you can specify the name of your application for logging purposes (it's mostly the cluster name, but cross-check before proceeding).

* The **SERVER_PORT** has been mentioned as 8000, since this project is using that port.
* If you wish to run the server on another port, you can change the port value.
* Replace the **MONGODB_URL** value with your MongoDB URL.  

**NOTE**: If you have trouble setting up MongoDB & Clusters, please refer here: https://www.mongodb.com/docs/guides/atlas/account/

## Usage

To run the project, use the following command in your terminal:

```bash
npm start
```
This will start the Express server.  
You can access the server locally at http://localhost:{SERVER_PORT}/api/employee.  

**NOTE**: If you have changed the server port, please know that the server will be running on the port you set.

## Technologies Used

1. **Node.js**: JavaScript runtime environment
2. **Express.js**: Web framework for Node.js
3. **MongoDB**: NoSQL database
4. **Mongoose**: ODM library for MongoDB
5. **Jest**: Testing framework

## API Documentation

The backend provides the following CRUD operations via API calls:

1. **Create an Employee**: POST /api/employee
2. **Retrieve All Employees**: GET /api/employee
3. **Retrieve a Single Employee**: GET /api/employee/:id
4. **Update an Employee**: PUT /api/employee/:id
5. **Delete an Employee**: DELETE /api/employee/:id

Please refer to the Swagger documentation for detailed information on each endpoint.  
You can access the Swagger server locally at http://localhost:{SERVER_PORT}/api-docs.

## Running Tests

To run the tests, execute the following command in your terminal:

```bash
npm test
```

This command will run all the test cases defined in the project.