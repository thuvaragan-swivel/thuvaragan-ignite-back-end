import Employee from "../model/employeeModel.js";
import CrudValidationService from "../services/validation-service/crudValidationService.js";
import EmployeeService from "../services/employee-service/employeeService.js";

// Mock the dependencies
jest.mock("../model/employeeModel.js");
jest.mock("../services/validation-service/crudValidationService.js");

describe("EmployeeService Tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createEmployee", () => {
    it("should create a new employee", async () => {
      const data = { firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '+94771234567', gender: 'Male', employeeId: 1 };
      const savedEmployee = { ...data, _id: '12345' };

      CrudValidationService.validateAndCheckExistingEmployee.mockResolvedValue(null);
      Employee.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedEmployee)
      }));

      const result = await EmployeeService.createEmployee(data);

      expect(result.status).toBe(201);
      expect(result.data).toMatchObject(savedEmployee);
    });

    it("should return validation error", async () => {
      const data = { firstName: 'John', lastName: 'Doe' };
      const validationError = { status: 400, message: "Validation Error" };

      CrudValidationService.validateAndCheckExistingEmployee.mockResolvedValue(validationError);

      const result = await EmployeeService.createEmployee(data);

      expect(result.status).toBe(400);
      expect(result.message).toBe("Validation Error");
    });
  });

  describe("getAllEmployees", () => {
    it("should get all employees with pagination", async () => {
      const employees = [
        { firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '+94771234567', gender: 'Male', employeeId: 1 },
        { firstName: 'Jane', lastName: 'Doe', emailAddress: 'jane.doe@example.com', phoneNumber: '+9477654321', gender: 'Female', employeeId: 2 }
      ];
      const query = { $or: [{ firstName: { $regex: 'Doe', $options: "i" } }] };

      Employee.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(employees)
      });
      Employee.countDocuments.mockResolvedValue(2);

      const result = await EmployeeService.getAllEmployees({ search: 'Doe', sort: 'asc', page: 1, limit: 10, sortBy: 'firstName' });

      expect(result.status).toBe(200);
      expect(result.data).toHaveLength(2);
      expect(result.pagination.currentPage).toBe(1);
      expect(result.pagination.totalPages).toBe(1);
      expect(result.totalCount).toBe(2);
    });
  });

  describe("getEmployeeById", () => {
    it("should get employee by ID", async () => {
      const employee = { firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '+94771234567', gender: 'Male', employeeId: 1 };

      CrudValidationService.findEmployeeById.mockResolvedValue(employee);

      const result = await EmployeeService.getEmployeeById(1);

      expect(result).toMatchObject(employee);
    });

    it("should return 404 if employee not found", async () => {
      CrudValidationService.findEmployeeById.mockResolvedValue(null);

      const result = await EmployeeService.getEmployeeById(99);

      expect(result).toBeNull();
    });
  });

  describe("updateEmployee", () => {
    it("should update employee data", async () => {
      const employee = { _id: '12345', firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '+94771234567', gender: 'Male', employeeId: 1 };
      const updatedEmployee = { ...employee, lastName: 'Smith' };

      CrudValidationService.findEmployeeById.mockResolvedValue(employee);
      CrudValidationService.validateAndCheckExistingEmployee.mockResolvedValue(null);
      Employee.findOneAndUpdate.mockResolvedValue(updatedEmployee);

      const result = await EmployeeService.updateEmployee(1, { lastName: 'Smith' });

      expect(result.status).toBe(200);
      expect(result.data).toMatchObject(updatedEmployee);
      expect(result.message).toBe("The Employee Data has been Successfully Updated.");
    });

    it("should return 404 if employee not found", async () => {
      CrudValidationService.findEmployeeById.mockResolvedValue(null);

      const result = await EmployeeService.updateEmployee(99, { lastName: 'Smith' });

      expect(result.status).toBe(404);
      expect(result.message).toBe('The Employee with the ID: 99 is not Found in the System!');
    });

    it("should return validation error", async () => {
      const employee = { _id: '12345', firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '+94771234567', gender: 'Male', employeeId: 1 };
      const validationError = { status: 400, message: "Validation Error" };

      CrudValidationService.findEmployeeById.mockResolvedValue(employee);
      CrudValidationService.validateAndCheckExistingEmployee.mockResolvedValue(validationError);

      const result = await EmployeeService.updateEmployee(1, { lastName: 'Smith' });

      expect(result.status).toBe(400);
      expect(result.message).toBe("Validation Error");
    });
  });

  describe("deleteEmployee", () => {
    it("should delete employee by ID", async () => {
      const employee = { _id: '12345', firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '+94771234567', gender: 'Male', employeeId: 1 };

      CrudValidationService.findEmployeeById.mockResolvedValue(employee);
      Employee.findOneAndDelete.mockResolvedValue(employee);

      const result = await EmployeeService.deleteEmployee(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe('The Employee with ID: 1 is Deleted Successfully.');
    });

    it("should return 404 if employee not found", async () => {
      CrudValidationService.findEmployeeById.mockResolvedValue(null);

      const result = await EmployeeService.deleteEmployee(99);

      expect(result.status).toBe(404);
      expect(result.message).toBe('The Employee with the ID: 99 is not Found in the System!');
    });
  });
});
