import Employee from "../../model/employee-model.js";
import EmployeeValidationService from "./employee-validation-service.js";

class CrudValidationService {
  static async validateAndCheckExistingEmployee(data, id = null) {
    const validationErrors = await EmployeeValidationService.validate(data);
    const { emailAddress, employeeId } = data;
    const errors = validationErrors || {};

    // Checking for existing email address.
    const emailAddressExist = await Employee.findOne({
      emailAddress,
      ...(id && { _id: { $ne: id } }), // Exclude current employee if updating...
    });
    if (emailAddressExist) {
      errors.emailAddress = `An Employee already exists with the Email ID: ${emailAddress}!`;
    }

    // Checking for existing employee ID.
    const employeeIdExist = await Employee.findOne({
      employeeId,
      ...(id && { _id: { $ne: id } }), // Exclude current employee if updating...
    });
    if (employeeIdExist) {
      errors.employeeId = `An Employee already exists with the Employee ID: [${employeeId}]!`;
    }

    if (Object.keys(errors).length > 0) {
      return {
        status: 400,
        message: errors,
      };
    }

    return null; // No errors.
  }

  static async findEmployeeById(employeeId) {
    const employeeExists = await Employee.findOne({ employeeId });
    if (!employeeExists) {
      return {
        status: 404,
        message: `The Employee with the ID: [${employeeId}] is not Found in the System!`,
      };
    }
    return employeeExists;
  }
}

export default CrudValidationService;
