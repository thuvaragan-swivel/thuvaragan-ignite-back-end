import Employee from "../../model/employee-model.js";
import CrudValidationService from "../../validation/crud-validation-service.js";

class EmployeeCreationService {
  async createEmployee(data) {
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(data);
    if (validationResult) {
      return {
        status: validationResult.status,
        message: validationResult.message,
      };
    }

    const newEmployee = new Employee(data);
    const savedEmployeeData = await newEmployee.save();
    return { status: 201, data: savedEmployeeData };
  }
}

export default new EmployeeCreationService();
