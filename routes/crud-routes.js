import express from "express";
import {
  // Theses are the Functions for the CRUD Operations.
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../crud-operations-controller/employee-crud.js";

const expressRouter = express.Router(); // Express Router initiation.

// Defining the Routes for CRUD Operations.
expressRouter.post("/employee", createEmployee);
expressRouter.get("/employee", getAllEmployees);
expressRouter.get("/employee/:id", getEmployeeById);
expressRouter.put("/employee/:id", updateEmployee);
expressRouter.delete("/employee/:id", deleteEmployee);

export default expressRouter;
