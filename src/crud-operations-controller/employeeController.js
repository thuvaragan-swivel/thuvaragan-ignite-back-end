import EmployeeService from "../services/employee-service/employeeService.js";
import logger from "../config/loggerConfig.js";
import {
  STATUS_CODES,
  PAGINATION_DEFAULTS,
  LOGGER_MESSAGES,
} from "../config/constantsConfig.js";

class EmployeeController {
  // Method to create a new employee.
  async createEmployee(req, res) {
    try {
      const result = await EmployeeService.createEmployee(req.body); // Calling the service method to create an employee.
      res.status(result.status).json(result); // Sending the response with the appropriate status and result.
    } catch (error) {
      // Handling any unexpected errors.
      res
        .status(STATUS_CODES.internalServerError)
        .json({ errorMessage: error.message });
    }
  }

  // Method to get all employees with pagination, sorting, and searching.
  async getAllEmployees(req, res) {
    try {
      // Destructuring query parameters with default values.
      const {
        search,
        sort = PAGINATION_DEFAULTS.sort,
        page = PAGINATION_DEFAULTS.page,
        limit = PAGINATION_DEFAULTS.limit,
        sortBy = PAGINATION_DEFAULTS.sortBy,
      } = req.query;
      // Calling the service method to get all employees.
      const result = await EmployeeService.getAllEmployees({
        search,
        sort,
        page,
        limit,
        sortBy,
      });
      logger.info(`Fetched ${result.totalCount} Employees.\n`);
      res.status(result.status).json(result);
    } catch (error) {
      logger.error(`Error Fetching Employees: ${error.message}\n`);
      res
        .status(STATUS_CODES.internalServerError)
        .json({ errorMessage: error.message });
    }
  }

  // Method to get an employee by their ID.
  async getEmployeeById(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10); // Parsing the employee ID from the request parameters.
      const result = await EmployeeService.getEmployeeById(employeeId); // Calling the service method to get the employee by ID.
      if (result.status) {
        logger.warn(
          LOGGER_MESSAGES.employeeFetchError(
            `Not Found with ID: ${employeeId}`
          )
        );
        return res.status(result.status).json({ message: result.message }); // If a status is present in the result, sending it with the response.
      }
      logger.info(LOGGER_MESSAGES.employeeFetchSuccess(employeeId));
      res.status(STATUS_CODES.ok).json(result);
    } catch (error) {
      logger.error(LOGGER_MESSAGES.employeeFetchError(error.message));
      res
        .status(STATUS_CODES.internalServerError)
        .json({ errorMessage: error.message });
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
      res.status(STATUS_CODES.ok).json(result);
    } catch (error) {
      res
        .status(STATUS_CODES.internalServerError)
        .json({ errorMessage: error.message });
    }
  }

  // Method to delete an employee by their employee ID.
  async deleteEmployee(req, res) {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const result = await EmployeeService.deleteEmployee(employeeId); // Call the service method to delete the employee.
      res.status(result.status).json(result);
    } catch (error) {
      res
        .status(STATUS_CODES.internalServerError)
        .json({ errorMessage: error.message });
    }
  }
}

export default new EmployeeController();
