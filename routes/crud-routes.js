import express from "express";
import {
  // Theses are the Functions for the CRUD Operations.
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../crud-operations-controller/employee-crud.js";

const expressRoute = express.Router(); // Express Router initiation.

// Defining the Routes for CRUD Operations.
expressRoute.post("/employee", createEmployee);
expressRoute.get("/employee", getAllEmployees);
expressRoute.get("/employee/:id", getEmployeeById);
expressRoute.put("/employee/:id", updateEmployee);
expressRoute.delete("/employee/:id", deleteEmployee);

export default expressRoute;
