import Employee from "../../model/employeeModel.js";
import CrudValidationService from "../validation-service/crudValidationService.js";
import logger from "../../config/loggerConfig.js";
import {
  STATUS_CODES,
  LOGGER_MESSAGES,
  PAGINATION_DEFAULTS,
} from "../../config/constantsConfig.js";

class EmployeeService {
  // Method to create a new employee.
  async createEmployee(data) {
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(data); // Validating and checking if employee already exists.
    if (validationResult) {
      logger.warn(
        LOGGER_MESSAGES.employeeValidationFailed(validationResult.message)
      );
      // If validation fails, returning the error response.
      return {
        status: validationResult.status,
        message: validationResult.message,
      };
    }

    // Processing with creating a new employee.
    try {
      const newEmployee = new Employee(data);
      const savedEmployeeData = await newEmployee.save();
      logger.info(
        LOGGER_MESSAGES.employeeCreateSuccess(savedEmployeeData.employeeId)
      );
      return {
        status: STATUS_CODES.created,
        message: `A New Employee named ${savedEmployeeData.firstName} ${savedEmployeeData.lastName} has been Successfully Added to the System.`,
        data: savedEmployeeData,
      };
    } catch (error) {
      logger.error(LOGGER_MESSAGES.employeeCreateError(error.message));
      throw error;
    }
  }

  // Method to get all employees with pagination, sort, and search functionalities.
  async getAllEmployees({
    search,
    sort = PAGINATION_DEFAULTS.sort,
    page = PAGINATION_DEFAULTS.page,
    limit = PAGINATION_DEFAULTS.limit,
    sortBy = PAGINATION_DEFAULTS.sortBy,
  }) {
    const query = {};

    // If search term is provided, building the search query.
    // Search by first name, last name, and email only.
    if (search) {
      const searchNumber = parseInt(search, 10);
      if (!isNaN(searchNumber)) {
        query.$or = [{ employeeId: searchNumber }];
      } else {
        query.$or = [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { emailAddress: { $regex: search, $options: "i" } },
        ];
      }
    }

    const sortOrder = sort === "desc" ? -1 : 1; // Determining the sort order.

    // Defining sorting criteria based on sortBy parameter.
    const sortCriteria = {};
    if (sortBy === "createdAt") {
      sortCriteria.createdAt = sortOrder;
    } else {
      sortCriteria.firstName = sortOrder;
    }

    try {
      // Fetching all employees with pagination, sorting, and search applied.
      const employees = await Employee.find(query)
        .sort(sortCriteria)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      // Getting total count of employees for pagination.
      const totalCount = await Employee.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);

      return {
        status: STATUS_CODES.ok,
        data: employees,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
          totalPages,
        },
        totalCount,
      };
    } catch (error) {
      logger.error(LOGGER_MESSAGES.employeesFetchError(error.message));
      throw error;
    }
  }

  // Method to get an employee by ID.
  async getEmployeeById(employeeId) {
    try {
      return await CrudValidationService.findEmployeeById(employeeId);
    } catch (error) {
      logger.error(
        LOGGER_MESSAGES.employeeFetchError(
          `ID ${employeeId}: ${error.message}`
        )
      );
      throw error;
    }
  }

  // Method to update an existing employee's data.
  async updateEmployee(employeeId, data) {
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    // Checking and returning error if employee does not exist in the system.
    if (employeeExists.status === STATUS_CODES.notFound) {
      logger.warn(
        LOGGER_MESSAGES.employeeFetchError(`Not Found with ID: ${employeeId}`)
      );
      return employeeExists; // Return the 404 error object.
    }

    // Validating the data and checking for existing conflicts.
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(
        data,
        employeeExists._id
      );
    if (validationResult) {
      logger.warn(
        LOGGER_MESSAGES.employeeValidationFailed(validationResult.message)
      );
      return {
        status: validationResult.status,
        message: validationResult.message,
      };
    }

    try {
      // Updating the employee data.
      const updatedEmployeeData = await Employee.findOneAndUpdate(
        { employeeId },
        data,
        { new: true }
      );

      // Returning error message if update failed.
      if (!updatedEmployeeData) {
        logger.error(
          LOGGER_MESSAGES.employeeUpdateError(`Failed with ID: ${employeeId}`)
        );
        return {
          status: STATUS_CODES.internalServerError,
          message: "Failed to Update this Employee Data!",
        };
      }

      // Returning success response with updated employee data.
      logger.info(LOGGER_MESSAGES.employeeUpdateSuccess(employeeId));
      return {
        status: STATUS_CODES.ok,
        message: "The Employee Data has been Successfully Updated.",
        data: updatedEmployeeData,
      };
    } catch (error) {
      logger.error(LOGGER_MESSAGES.employeeUpdateError(error.message));
      throw error;
    }
  }

  // Method to delete an employee by ID.
  async deleteEmployee(employeeId) {
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    if (employeeExists.status === STATUS_CODES.notFound) {
      logger.warn(
        LOGGER_MESSAGES.employeeFetchError(`Not Found with ID: ${employeeId}`)
      );
      return employeeExists;
    }

    try {
      await Employee.findOneAndDelete({ employeeId }); // Deleting the employee from the database.
      logger.info(LOGGER_MESSAGES.employeeDeleteSuccess(employeeId));
      return {
        status: STATUS_CODES.ok,
        message: `The Employee named ${employeeExists.firstName} ${employeeExists.lastName} is Successfully Deleted from the System.`,
      };
    } catch (error) {
      logger.error(LOGGER_MESSAGES.employeeDeleteError(error.message));
      throw error;
    }
  }
}

// Exporting an instance of the EmployeeService class.
export default new EmployeeService();
