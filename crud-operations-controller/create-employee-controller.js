import EmployeeCreationService from "../services/employee-services/employee-creation-service.js";

class CreateEmployeeController {
  async createEmployee(req, res) {
    try {
      const result = await EmployeeCreationService.createEmployee(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new CreateEmployeeController();
