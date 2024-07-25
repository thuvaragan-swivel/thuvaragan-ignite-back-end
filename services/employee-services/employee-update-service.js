import Employee from "../../model/employee-model.js";
import CrudValidationService from "../../validation/crud-validation-service.js";

class EmployeeUpdateService {
  async updateEmployee(employeeId, data) {
    // Check if the employee exists using CrudValidationService
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    if (employeeExists.status) {
      return employeeExists; // Return the status and message if employee is not found
    }

    // Validate and check for existing email and employee ID
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(
        data,
        employeeExists._id
      );
    if (validationResult) {
      return {
        status: validationResult.status,
        message: validationResult.message,
      };
    }

    // Perform the update if employee exists and validation passes
    const updatedEmployeeData = await Employee.findOneAndUpdate(
      { employeeId },
      data,
      { new: true }
    );

    if (!updatedEmployeeData) {
      return {
        status: 500,
        message: "Failed to update the employee.",
      };
    }

    return {
      status: 200,
      message: "Employee updated successfully.",
      data: updatedEmployeeData,
    };
  }
}

export default new EmployeeUpdateService();
