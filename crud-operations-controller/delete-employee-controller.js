import EmployeeDeletionService from "../services/employee-services/employee-deletion-service.js";

class DeleteEmployeeController {
  async deleteEmployee(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeDeletionService.deleteEmployee(employeeId);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new DeleteEmployeeController();
