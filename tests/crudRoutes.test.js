// crudRoutes.test.js

import request from "supertest";
import express from "express";
import expressRouter from "../routes/crudRoutes.js";

// Creating an express app and using the router.
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies.
app.use("/api", expressRouter);

// Mocking the EmployeeController methods.
jest.mock("../crud-operations-controller/employeeController.js", () => ({
  createEmployee: jest.fn((req, res) =>
    res.status(201).send({ message: "Employee created" })
  ),
  getAllEmployees: jest.fn((req, res) =>
    res
      .status(200)
      .send([{ id: 1, firstName: "Jonathan", lastName: "Davidson" }])
  ),
  getEmployeeById: jest.fn((req, res) =>
    res
      .status(200)
      .send({ id: req.params.id, firstName: "Jonathan", lastName: "Davidson" })
  ),
  updateEmployee: jest.fn((req, res) =>
    res.status(200).send({ message: "Employee updated" })
  ),
  deleteEmployee: jest.fn((req, res) =>
    res.status(200).send({ message: "Employee deleted" })
  ),
}));

describe("CRUD Routes", () => {
  test("POST /api/employee should create an employee", async () => {
    const res = await request(app).post("/api/employee").send({
      firstName: "Jonathan",
      lastName: "Davidson",
      email: "jon.dav@gmail.com",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Employee created");
  });

  test("GET /api/employee should return all employees", async () => {
    const res = await request(app).get("/api/employee");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { id: 1, firstName: "Jonathan", lastName: "Davidson" },
    ]);
  });

  test("GET /api/employee/:id should return an employee by id", async () => {
    const res = await request(app).get("/api/employee/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", "1");
    expect(res.body).toHaveProperty("firstName", "Jonathan");
    expect(res.body).toHaveProperty("lastName", "Davidson");
  });

  test("PUT /api/employee/:id should update an employee by id", async () => {
    const res = await request(app).put("/api/employee/1").send({
      firstName: "Jonathan",
      lastName: "Davidson",
      email: "jon.david@gmail.com",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Employee updated");
  });

  test("DELETE /api/employee/:id should delete an employee by id", async () => {
    const res = await request(app).delete("/api/employee/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Employee deleted");
  });
});
