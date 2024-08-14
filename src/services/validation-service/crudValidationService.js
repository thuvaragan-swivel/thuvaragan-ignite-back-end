import Employee from "../../model/employeeModel.js";
import EmployeeValidationService from "./employeeValidationService.js";
import { STATUS_CODES } from "../../config/constantsConfig.js";

class CrudValidationService {
  static async validateAndCheckExistingEmployee(data, id = null) {
    // Validating employee data using EmployeeValidationService.
    const validationErrors = await EmployeeValidationService.validate(data);
    const { emailAddress } = data;
    const errors = validationErrors || {};

    // If there are validation errors, returning them.
    if (Object.keys(errors).length > 0) {
      return {
        status: STATUS_CODES.badRequest,
        message: errors,
      };
    }

    // Checking if an employee with the same email address already exists.
    const emailAddressExist = await Employee.findOne({
      emailAddress,
      ...(id && { _id: { $ne: id } }), // Excluding the current employee ID if updating.
    });
    if (emailAddressExist) {
      errors.emailAddress = `An Employee already exists with the Email Address: ${emailAddress}!`;
    }

    if (Object.keys(errors).length > 0) {
      return {
        status: STATUS_CODES.badRequest,
        message: errors,
      };
    }

    return null;
  }

  // Finding an existing employee by their ID.
  static async findEmployeeById(employeeId) {
    const employeeExists = await Employee.findOne({ employeeId }); // Finding the employee in the database.
    // If the employee does not exist, returning a 404 error.
    if (!employeeExists) {
      return {
        status: STATUS_CODES.notFound,
        message: `The Employee with the ID: ${employeeId} is not Found in the System!`,
      };
    }
    return employeeExists; // Returning the employee object if found existing in the system.
  }
}

export default CrudValidationService;
