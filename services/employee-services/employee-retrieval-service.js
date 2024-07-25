import CrudValidationService from "../../validation/crud-validation-service.js";
import Employee from "../../model/employee-model.js";

class EmployeeRetrievalService {
  async getEmployeeById(employeeId) {
    return await CrudValidationService.findEmployeeById(employeeId);
  }
}

export default new EmployeeRetrievalService();
