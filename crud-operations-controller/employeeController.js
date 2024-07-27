import EmployeeService from "../services/employee-service/employeeService.js"

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const result = await EmployeeService.createEmployee(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }


  async getAllEmployees(req, res) {
    try {
      const { search, sort = "asc", page = 1, limit = 10, sortBy = "firstName" } = req.query;
      const result = await EmployeeService.getAllEmployees({
        search,
        sort,
        page,
        limit,
        sortBy,
      });
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeService.getEmployeeById(employeeId);
      if (result.status) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeService.updateEmployee(employeeId, req.body);
      if (result.status) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }


  
  async deleteEmployee(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeService.deleteEmployee(employeeId);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new EmployeeController();
