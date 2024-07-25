import Employee from "../../model/employee-model.js";
import CrudValidationService from "../../validation/crud-validation-service.js";

class EmployeeDeletionService {
  async deleteEmployee(employeeId) {
    // Check if the employee exists using CrudValidationService
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    if (employeeExists.status) {
      return employeeExists; // Return the status and message if employee is not found
    }

    // Proceed with deletion if the employee exists
    await Employee.findOneAndDelete({ employeeId });

    return {
      status: 200,
      message: `The Employee with ID: [${employeeId}] is deleted successfully.`,
    };
  }
}

export default new EmployeeDeletionService();
