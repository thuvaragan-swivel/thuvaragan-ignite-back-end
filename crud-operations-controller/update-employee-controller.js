import employeeUpdateService from "../services/employee-services/employee-update-service.js";

class UpdateEmployeeController {
  async updateEmployee(req, res) {
    try {
      // Ensure employeeId is correctly parsed from the request
      const employeeId = parseInt(req.params.id, 10);
      // if (isNaN(employeeId)) {
      //   return res.status(400).json({ errorMessage: "Invalid employee ID format" });
      // }

      const result = await employeeUpdateService.updateEmployee(
        employeeId,
        req.body
      );
      if (result.status) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new UpdateEmployeeController();
