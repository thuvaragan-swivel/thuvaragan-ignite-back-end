import express from "express";
import EmployeeController from "../crud-operations-controller/employeeController.js";

// Creating an Express Router instance.
const expressRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employee Management System
 *   description: CRUD Operations related to Employee Management
 */

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create a New Employee
 *     tags: [Employee Management System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - emailAddress
 *               - phoneNumber
 *               - gender
 *               - employeeId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *                 description: Unique Email Address for the Employee
 *               phoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *               employeeId:
 *                 type: integer
 *                 description: Unique Employee ID for the Employee
 *     responses:
 *       201:
 *         description: Employee Created Successfully
 *       500:
 *         description: Internal Server Error
 */
expressRouter.post("/employee", EmployeeController.createEmployee); // Route to create a new employee.

/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Retrieve All Employees
 *     tags: [Employee Management System]
 *     responses:
 *       200:
 *         description: List of Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   emailAddress:
 *                     type: string
 *                     description: Unique Email Address for the Employee
 *                   phoneNumber:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   employeeId:
 *                     type: integer
 *                     description: Unique Employee ID for the Employee
 *       500:
 *         description: Internal Server Error
 */
expressRouter.get("/employee", EmployeeController.getAllEmployees); // Route to get all employees.

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Retrieve a Specific Employee by ID
 *     tags: [Employee Management System]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee Details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 emailAddress:
 *                   type: string
 *                   description: Unique Email Address for the Employee
 *                 phoneNumber:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 employeeId:
 *                   type: integer
 *                   description: Unique Employee ID for the Employee
 *       404:
 *         description: Employee Not Found
 *       500:
 *         description: Internal Server Error
 */
expressRouter.get("/employee/:id", EmployeeController.getEmployeeById); // Route to get a specific employee by ID.

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update an Existing Employee by ID
 *     tags: [Employee Management System]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - emailAddress
 *               - phoneNumber
 *               - gender
 *               - employeeId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *                 description: Unique Email Address for the Employee
 *               phoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *               employeeId:
 *                 type: integer
 *                 description: Unique Employee ID for the Employee
 *     responses:
 *       200:
 *         description: Employee Updated Successfully
 *       404:
 *         description: Employee Not Found
 *       500:
 *         description: Internal Server Error
 */
expressRouter.put("/employee/:id", EmployeeController.updateEmployee); // Route to update an existing employee by ID.

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete an Employee by ID
 *     tags: [Employee Management System]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee Deleted Successfully
 *       404:
 *         description: Employee Not Found
 *       500:
 *         description: Internal Server Error
 */
expressRouter.delete("/employee/:id", EmployeeController.deleteEmployee); // Route to delete an employee by ID.

// Exporting the router.
export default expressRouter;
