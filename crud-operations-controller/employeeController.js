import EmployeeService from "../services/employee-service/employeeService.js";

class EmployeeController {
  // Method to create a new employee.
  async createEmployee(req, res) {
    try {
      const result = await EmployeeService.createEmployee(req.body); // Calling the service method to create an employee.
      res.status(result.status).json(result); // Sending the response with the appropriate status and result.
    } catch (error) {
      // Handling any unexpected errors.
      res.status(500).json({ errorMessage: error.message });
    }
  }

  // Method to get all employees with pagination, sorting, and searching.
  async getAllEmployees(req, res) {
    try {
      // Destructuring query parameters with default values.
      const {
        search,
        sort = "asc",
        page = 1,
        limit = 12,
        sortBy = "firstName",
      } = req.query;
      // Calling the service method to get all employees.
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

  // Method to get an employee by their ID.
  async getEmployeeById(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10); // Parsing the employee ID from the request parameters.
      const result = await EmployeeService.getEmployeeById(employeeId); // Calling the service method to get the employee by ID.
      if (result.status) {
        return res.status(result.status).json({ message: result.message }); // If a status is present in the result, sending it with the response.
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }

  // Method to update an existing employee's data.
  async updateEmployee(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeService.updateEmployee(employeeId, req.body); // Calling the service method to update the employee's data.
      if (result.status) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }

  // Method to delete an employee by their employee ID.
  async deleteEmployee(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeService.deleteEmployee(employeeId); // Call the service method to delete the employee.
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
}

export default new EmployeeController();
