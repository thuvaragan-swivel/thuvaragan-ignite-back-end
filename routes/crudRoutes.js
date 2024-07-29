import express from "express";
import EmployeeController from "../crud-operations-controller/employeeController.js";

// Creating an Express Router instance.
const expressRouter = express.Router();

// Creating the relevant routes for the CRUD operations.
// By calling the relevant methods from EmployeeController.
expressRouter.post("/employee", EmployeeController.createEmployee); // Route to create a new employee.
expressRouter.get("/employee", EmployeeController.getAllEmployees); // Route to get all employees.
expressRouter.get("/employee/:id", EmployeeController.getEmployeeById); // Route to get a specific employee by ID.
expressRouter.put("/employee/:id", EmployeeController.updateEmployee); // Route to update an existing employee by ID.
expressRouter.delete("/employee/:id", EmployeeController.deleteEmployee); // Route to delete an employee by ID.

// Exporting the router.
export default expressRouter;
