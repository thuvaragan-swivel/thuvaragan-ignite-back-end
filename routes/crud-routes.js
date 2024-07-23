import express from "express";
import {
  create,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../crud-operations/employee-crud.js";

const expressRoute = express.Router();

expressRoute.post("/employee", create);
expressRoute.get("/employees", getAllEmployees);
expressRoute.get("/employee/:id", getEmployeeById);
expressRoute.put("/update/employee/:id", updateEmployee);
expressRoute.delete("/delete/employee/:id", deleteEmployee);

export default expressRoute;
