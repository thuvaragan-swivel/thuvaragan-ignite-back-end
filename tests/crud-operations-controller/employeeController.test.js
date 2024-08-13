import EmployeeController from "../../src/crud-operations-controller/employeeController.js";
import EmployeeService from "../../src/services/employee-service/employeeService.js";

// Mocking EmployeeService methods.
jest.mock("../../src/services/employee-service/employeeService.js");

describe("EmployeeController", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("createEmployee", () => {
    it("should create an employee and return the result", async () => {
      req.body = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
      };
      EmployeeService.createEmployee.mockResolvedValue({
        status: 201,
        message: "Employee created",
      });

      await EmployeeController.createEmployee(req, res);

      expect(EmployeeService.createEmployee).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 201,
        message: "Employee created",
      });
    });

    it("should handle errors", async () => {
      req.body = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
      };
      EmployeeService.createEmployee.mockRejectedValue(
        new Error("Error creating employee")
      );

      await EmployeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error creating employee",
      });
    });
  });

  describe("getAllEmployees", () => {
    it("should return all employees with query params", async () => {
      req.query = {
        search: "Davidson",
        sort: "asc",
        page: 1,
        limit: 10,
        sortBy: "firstName",
      };
      EmployeeService.getAllEmployees.mockResolvedValue({
        status: 200,
        data: [],
      });

      await EmployeeController.getAllEmployees(req, res);

      expect(EmployeeService.getAllEmployees).toHaveBeenCalledWith(req.query);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, data: [] });
    });

    it("should handle errors", async () => {
      req.query = { search: "Davidson" };
      EmployeeService.getAllEmployees.mockRejectedValue(
        new Error("Error retrieving employees")
      );

      await EmployeeController.getAllEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error retrieving employees",
      });
    });
  });

  describe("getEmployeeById", () => {
    it("should return an employee by ID", async () => {
      req.params = { id: "1" };
      EmployeeService.getEmployeeById.mockResolvedValue({
        status: 200,
        message: "Employee found",
      });

      await EmployeeController.getEmployeeById(req, res);

      expect(EmployeeService.getEmployeeById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Employee found" });
    });

    it("should handle errors", async () => {
      req.params = { id: "1" };
      EmployeeService.getEmployeeById.mockRejectedValue(
        new Error("Error retrieving employee")
      );

      await EmployeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error retrieving employee",
      });
    });
  });

  describe("updateEmployee", () => {
    it("should update an employee and return the result", async () => {
      req.params = { id: "1" };
      req.body = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.david@gmail.com",
      };
      EmployeeService.updateEmployee.mockResolvedValue({
        status: 200,
        message: "Employee updated",
      });

      await EmployeeController.updateEmployee(req, res);

      expect(EmployeeService.updateEmployee).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Employee updated" });
    });

    it("should handle errors", async () => {
      req.params = { id: "1" };
      req.body = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.david@gmail.com",
      };
      EmployeeService.updateEmployee.mockRejectedValue(
        new Error("Error updating employee")
      );

      await EmployeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error updating employee",
      });
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee and return the result", async () => {
      req.params = { id: "1" };
      EmployeeService.deleteEmployee.mockResolvedValue({
        status: 200,
        message: "Employee deleted",
      });

      await EmployeeController.deleteEmployee(req, res);

      expect(EmployeeService.deleteEmployee).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: "Employee deleted",
      });
    });

    it("should handle errors", async () => {
      req.params = { id: "1" };
      EmployeeService.deleteEmployee.mockRejectedValue(
        new Error("Error deleting employee")
      );

      await EmployeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error deleting employee",
      });
    });
  });
});
