import Employee from "../../model/employeeModel.js";
import CrudValidationService from "../validation-service/crudValidationService.js";
import logger from "../../config/loggerConfig.js";

class EmployeeService {
  // Method to create a new employee.
  async createEmployee(data) {
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(data); // Validating and checking if employee already exists.
    if (validationResult) {
      logger.warn(
        `Validation Failed:\n${JSON.stringify(validationResult.message, null, 2)}\n`
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
        `New Employee Created with ID: ${savedEmployeeData.employeeId}\n`
      );
      return {
        status: 201,
        message: `A New Employee named ${savedEmployeeData.firstName} ${savedEmployeeData.lastName} has been Successfully Added to the System.`,
        data: savedEmployeeData,
      };
    } catch (error) {
      logger.error(`Error Creating Employee: ${error.message}\n`);
      throw error;
    }
  }

  // Method to get all employees with pagination, sort, and search functionalities.
  async getAllEmployees({
    search,
    sort = "asc",
    page = 1,
    limit = 12,
    sortBy = "firstName",
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
        status: 200,
        data: employees,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
          totalPages,
        },
        totalCount,
      };
    } catch (error) {
      throw error;
    }
  }

  // Method to get an employee by ID.
  async getEmployeeById(employeeId) {
    try {
      return await CrudValidationService.findEmployeeById(employeeId);
    } catch (error) {
      throw error;
    }
  }

  // Method to update an existing employee's data.
  async updateEmployee(employeeId, data) {
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    // Checking and returning error if employee does not exist in the system.
    if (employeeExists.status === 404) {
      logger.warn(`Employee Not Found with ID: ${employeeId}\n`);
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
        `Validation Failed:\n${JSON.stringify(validationResult.message, null, 2)}\n`
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
        logger.error(`Failed to Update Employee with ID: ${employeeId}\n`);
        return {
          status: 500,
          message: "Failed to Update this Employee Data!",
        };
      }

      // Returning success response with updated employee data.
      logger.info(`Updated Employee with ID: ${employeeId}\n`);
      return {
        status: 200,
        message: "The Employee Data has been Successfully Updated.",
        data: updatedEmployeeData,
      };
    } catch (error) {
      logger.error(`Error Updating Employee: ${error.message}\n`);
      throw error;
    }
  }

  // Method to delete an employee by ID.
  async deleteEmployee(employeeId) {
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    if (employeeExists.status === 404) {
      logger.warn(`Employee Not Found with ID: ${employeeId}\n`);
      return employeeExists;
    }

    try {
      await Employee.findOneAndDelete({ employeeId }); // Deleting the employee from the database.
      logger.info(`Deleted Employee with ID: ${employeeId}\n`);
      return {
        status: 200,
        message: `The Employee named ${employeeExists.firstName} ${employeeExists.lastName} is Successfully Deleted from the System.`,
      };
    } catch (error) {
      logger.error(`Error Deleting Employee: ${error.message}\n`);
      throw error;
    }
  }
}

// Exporting an instance of the EmployeeService class.
export default new EmployeeService();
