import Employee from "../../../src/model/employeeModel.js";
import CrudValidationService from "../../../src/services/validation-service/crudValidationService.js";
import EmployeeService from "../../../src/services/employee-service/employeeService.js";

// Mocking the dependencies.
jest.mock("../../../src/model/employeeModel.js");
jest.mock("../../../src/services/validation-service/crudValidationService.js");

describe("EmployeeService Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createEmployee", () => {
    it("should create a new employee", async () => {
      const data = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
        phoneNumber: "+94771234567",
        gender: "Male",
        employeeId: 1,
      };
      const savedEmployee = { ...data, _id: "12345" };

      CrudValidationService.validateAndCheckExistingEmployee = jest
        .fn()
        .mockResolvedValue(null);
      Employee.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedEmployee),
      }));

      const result = await EmployeeService.createEmployee(data);

      expect(result.status).toBe(201);
      expect(result.message).toBe(
        "A New Employee named Jonathan Davidson has been Successfully Added to the System."
      );
      expect(result.data).toMatchObject(savedEmployee);
    });

    it("should return validation error", async () => {
      const data = { firstName: "Jonathan", lastName: "Davidson" };
      const validationError = { status: 400, message: "Validation Error" };

      CrudValidationService.validateAndCheckExistingEmployee = jest
        .fn()
        .mockResolvedValue(validationError);

      const result = await EmployeeService.createEmployee(data);

      expect(result.status).toBe(400);
      expect(result.message).toBe("Validation Error");
    });
  });

  describe("getAllEmployees", () => {
    it("should get all employees with pagination", async () => {
      const employees = [
        {
          firstName: "Jonathan",
          lastName: "Davidson",
          emailAddress: "jon.dav@gmail.com",
          phoneNumber: "+94771234567",
          gender: "Male",
          employeeId: 1,
        },
        {
          firstName: "Janace",
          lastName: "Davidson",
          emailAddress: "jan.dav@example.com",
          phoneNumber: "+9477654321",
          gender: "Female",
          employeeId: 2,
        },
      ];

      Employee.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(employees),
      });
      Employee.countDocuments.mockResolvedValue(2);

      const result = await EmployeeService.getAllEmployees({
        search: "Davidson",
        sort: "asc",
        page: 1,
        limit: 10,
        sortBy: "firstName",
      });

      expect(result.status).toBe(200);
      expect(result.data).toHaveLength(2);
      expect(result.pagination.currentPage).toBe(1);
      expect(result.pagination.totalPages).toBe(1);
      expect(result.totalCount).toBe(2);
    });
  });

  describe("getEmployeeById", () => {
    it("should get employee by ID", async () => {
      const employee = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
        phoneNumber: "+94771234567",
        gender: "Male",
        employeeId: 1,
      };

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
      const employee = {
        _id: "12345",
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
        phoneNumber: "+94771234567",
        gender: "Male",
        employeeId: 1,
      };
      const updatedEmployee = { ...employee, lastName: "Smith" };
  
      CrudValidationService.findEmployeeById = jest.fn().mockResolvedValue(employee);
      CrudValidationService.validateAndCheckExistingEmployee = jest.fn().mockResolvedValue(null);
      Employee.findOneAndUpdate = jest.fn().mockResolvedValue(updatedEmployee);
  
      const result = await EmployeeService.updateEmployee(1, { lastName: "Smith" });
  
      expect(result.status).toBe(200);
      expect(result.data).toMatchObject(updatedEmployee);
      expect(result.message).toBe("The Employee Data has been Successfully Updated.");
    });
  
    it("should return 404 if employee not found", async () => {
      CrudValidationService.findEmployeeById = jest.fn().mockResolvedValue({
        status: 404,
        message: "The Employee with the ID: 99 is not Found in the System!"
      });
  
      const result = await EmployeeService.updateEmployee(99, { lastName: "Smith" });
  
      expect(result.status).toBe(404);
      expect(result.message).toBe("The Employee with the ID: 99 is not Found in the System!");
    });
  
    it("should return validation error", async () => {
      const employee = {
        _id: "12345",
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
        phoneNumber: "+94771234567",
        gender: "Male",
        employeeId: 1,
      };
      const validationError = { status: 400, message: "Validation Error" };
  
      CrudValidationService.findEmployeeById = jest.fn().mockResolvedValue(employee);
      CrudValidationService.validateAndCheckExistingEmployee = jest.fn().mockResolvedValue(validationError);
  
      const result = await EmployeeService.updateEmployee(1, { lastName: "Smith" });
  
      expect(result.status).toBe(400);
      expect(result.message).toBe("Validation Error");
    });
  });
  
  describe("deleteEmployee", () => {
    it("should delete employee by ID", async () => {
      const employee = {
        _id: "12345",
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
        phoneNumber: "+94771234567",
        gender: "Male",
        employeeId: 1,
      };

      CrudValidationService.findEmployeeById.mockResolvedValue(employee);
      Employee.findOneAndDelete.mockResolvedValue(employee);

      const result = await EmployeeService.deleteEmployee(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe(
        "The Employee named Jonathan Davidson is Successfully Deleted from the System."
      );
    });

    it("should return 404 if employee not found in validation", async () => {
      CrudValidationService.findEmployeeById.mockResolvedValue({
        status: 404,
        message: "The Employee with the ID: 99 is not Found in the System!",
      });

      const result = await EmployeeService.deleteEmployee(99);

      expect(result.status).toBe(404);
      expect(result.message).toBe(
        "The Employee with the ID: 99 is not Found in the System!"
      );
    });

    it("should return 404 if employee not found in database", async () => {
      CrudValidationService.findEmployeeById.mockResolvedValue({
        status: 404,
        message: "The Employee with the ID: 1 is not Found in the System!",
      });

      const result = await EmployeeService.deleteEmployee(1);

      expect(result.status).toBe(404);
      expect(result.message).toBe(
        "The Employee with the ID: 1 is not Found in the System!"
      );
    });
  });
  
});
