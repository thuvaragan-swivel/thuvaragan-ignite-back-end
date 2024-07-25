import express from "express";

import CreateEmployeeController from "../crud-operations-controller/create-employee-controller.js";
import GetAllEmployeesController from "../crud-operations-controller/get-all-employees-controller.js";
import GetEmployeeController from "../crud-operations-controller/get-employee-controller.js";
import UpdateEmployeeController from "../crud-operations-controller/update-employee-controller.js";
import DeleteEmployeeController from "../crud-operations-controller/delete-employee-controller.js";

const expressRouter = express.Router(); // Express Router initiation.

// Defining the Routes for CRUD Operations.
expressRouter.post("/employee", CreateEmployeeController.createEmployee);
expressRouter.get("/employee", GetAllEmployeesController.getAllEmployees);
expressRouter.get("/employee/:id", GetEmployeeController.getEmployeeById);
expressRouter.put("/employee/:id", UpdateEmployeeController.updateEmployee);
expressRouter.delete("/employee/:id", DeleteEmployeeController.deleteEmployee);

export default expressRouter;
