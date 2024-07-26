import express from "express";
import EmployeeController from "../crud-operations-controller/employee-controller.js";

const expressRouter = express.Router();

expressRouter.post("/employee", EmployeeController.createEmployee);
expressRouter.get("/employee", EmployeeController.getAllEmployees);
expressRouter.get("/employee/:id", EmployeeController.getEmployeeById);
expressRouter.put("/employee/:id", EmployeeController.updateEmployee);
expressRouter.delete("/employee/:id", EmployeeController.deleteEmployee);

export default expressRouter;
