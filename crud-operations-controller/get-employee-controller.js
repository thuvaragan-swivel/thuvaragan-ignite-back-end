import EmployeeRetrievalService from "../services/employee-services/employee-retrieval-service.js";

class GetEmployeeController {
  async getEmployeeById(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeRetrievalService.getEmployeeById(employeeId);
      if (result.status) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new GetEmployeeController();
