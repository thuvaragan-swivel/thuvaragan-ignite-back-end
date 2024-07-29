import Employee from "../../model/employeeModel.js";
import EmployeeValidationService from "./employeeValidationService.js";

class CrudValidationService {
  static async validateAndCheckExistingEmployee(data, id = null) {
    const validationErrors = await EmployeeValidationService.validate(data);
    const { emailAddress, employeeId } = data;
    const errors = validationErrors || {};

    if (Object.keys(errors).length > 0) {
      return {
        status: 400,
        message: errors,
      };
    }

    const emailAddressExist = await Employee.findOne({
      emailAddress,
      ...(id && { _id: { $ne: id } }),
    });
    if (emailAddressExist) {
      errors.emailAddress = `An Employee already exists with the Email ID: ${emailAddress} !`;
    }

    const employeeIdExist = await Employee.findOne({
      employeeId,
      ...(id && { _id: { $ne: id } }),
    });
    if (employeeIdExist) {
      errors.employeeId = `An Employee already exists with the Employee ID: ${employeeId} !`;
    }

    if (Object.keys(errors).length > 0) {
      return {
        status: 400,
        message: errors,
      };
    }

    return null;
  }

  static async findEmployeeById(employeeId) {
    const employeeExists = await Employee.findOne({ employeeId });
    if (!employeeExists) {
      return {
        status: 404,
        message: `The Employee with the ID: ${employeeId} is not Found in the System!`,
      };
    }
    return employeeExists;
  }
}

export default CrudValidationService;
