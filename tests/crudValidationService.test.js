// crudValidationService.test.js

import CrudValidationService from "../services/validation-service/crudValidationService";
import Employee from "../model/employeeModel";
import EmployeeValidationService from "../services/validation-service/employeeValidationService";

jest.mock("../model/employeeModel");
jest.mock("../services/validation-service/employeeValidationService");

describe("CrudValidationService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("validateAndCheckExistingEmployee", () => {
    test("should return validation errors if validation fails", async () => {
      const data = { emailAddress: "jon.dav@gmail.com", employeeId: 1 };
      const validationErrors = { emailAddress: "Invalid email" };

      // Mocking validation to return errors.
      EmployeeValidationService.validate.mockResolvedValue(validationErrors);

      // Ensuring `Employee.findOne` is not called.
      const result =
        await CrudValidationService.validateAndCheckExistingEmployee(data);

      // Assertions.
      expect(result).toEqual({
        status: 400,
        message: validationErrors,
      });

      // Checking that `Employee.findOne` was not called.
      expect(Employee.findOne).not.toHaveBeenCalled();
    });

    test("should return error if email address already exists", async () => {
      const data = { emailAddress: "jon.dav@gmail.com", employeeId: 1 };

      // Mocking validation to return no errors.
      EmployeeValidationService.validate.mockResolvedValue({});
      // Mocking `Employee.findOne` to return an existing record for email address.
      Employee.findOne
        .mockResolvedValueOnce({}) // For emailAddress check - should return an object indicating existing email.
        .mockResolvedValue(null); // For employeeId check - should return null to proceed to the next check.

      const result =
        await CrudValidationService.validateAndCheckExistingEmployee(data);

      expect(result).toEqual({
        status: 400,
        message: {
          emailAddress:
            "An Employee already exists with the Email Address: jon.dav@gmail.com !",
        },
      });
    });

    test("should return error if employee ID already exists", async () => {
      const data = { emailAddress: "jon.dav@gmail.com", employeeId: 1 };

      // Mocking validation to return no errors.
      EmployeeValidationService.validate.mockResolvedValue({});

      // Mocking `Employee.findOne` to return:
      // 1. A result for the email check.
      // 2. An existing record for employee ID check.
      Employee.findOne
        .mockResolvedValueOnce(null) // For emailAddress check - should return null to proceed to the next check.
        .mockResolvedValueOnce({}); // For employeeId check - should return an object indicating existing employee ID.

      const result =
        await CrudValidationService.validateAndCheckExistingEmployee(data);

      expect(result).toEqual({
        status: 400,
        message: {
          employeeId: "An Employee already exists with the Employee ID: 1 !",
        },
      });
    });

    test("should return null if no errors", async () => {
      const data = { emailAddress: "jon.dav@gmail.com", employeeId: 1 };

      // Mocking validation to return no errors.
      EmployeeValidationService.validate.mockResolvedValue({});
      // Mocking `Employee.findOne` to return null for both checks.
      Employee.findOne.mockResolvedValue(null); // No existing employees in the database.

      const result =
        await CrudValidationService.validateAndCheckExistingEmployee(data);

      expect(result).toBeNull();
    });
  });

  describe("findEmployeeById", () => {
    test("should return 404 if employee does not exist", async () => {
      const employeeId = 1;

      // Mocking `Employee.findOne` to return null.
      Employee.findOne.mockResolvedValue(null);

      const result = await CrudValidationService.findEmployeeById(employeeId);

      expect(result).toEqual({
        status: 404,
        message: `The Employee with the ID: ${employeeId} is not Found in the System!`,
      });
    });

    test("should return employee if found", async () => {
      const employeeId = 1;
      const employeeData = {
        firstName: "Jonathan",
        lastName: "Davidson",
        emailAddress: "jon.dav@gmail.com",
        employeeId: 1,
      };

      // Mocking `Employee.findOne` to return employee data.
      Employee.findOne.mockResolvedValue(employeeData);

      const result = await CrudValidationService.findEmployeeById(employeeId);

      expect(result).toEqual(employeeData);
    });
  });
});
