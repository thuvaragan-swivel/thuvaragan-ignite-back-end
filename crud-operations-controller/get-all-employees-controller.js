import EmployeeQueryService from "../services/employee-query-service/employee-query-service.js";

class GetAllEmployeesController {
  async getAllEmployees(req, res) {
    try {
      const { search, sort = "asc", page = 1, limit = 10, sortBy = "firstName" } = req.query;
      const result = await EmployeeQueryService.getAllEmployees({
        search,
        sort,
        page,
        limit,
        sortBy
      });
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new GetAllEmployeesController();