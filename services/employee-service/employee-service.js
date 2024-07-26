import Employee from "../../model/employee-model.js";
import CrudValidationService from "../validation-service/crud-validation-service.js";

class EmployeeService {
  

  async createEmployee(data) {
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(data);
    if (validationResult) {
      return {
        status: validationResult.status,
        message: validationResult.message,
      };
    }

    const newEmployee = new Employee(data);
    const savedEmployeeData = await newEmployee.save();
    return { status: 201, data: savedEmployeeData };
  }

  

  async getAllEmployees({ search, sort = "asc", page = 1, limit = 10, sortBy = 'firstName' }) {
    const query = {};

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

    const sortOrder = sort === "desc" ? -1 : 1;

    const sortCriteria = {};
    if (sortBy === 'createdAt') {
      sortCriteria.createdAt = sortOrder;
    } else {
      sortCriteria.firstName = sortOrder;
    }

    const employees = await Employee.find(query)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Employee.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      status: 200,
      data: employees,
      pagination: {
        totalCount,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
      },
    };
  }

  

  async getEmployeeById(employeeId) {
    return await CrudValidationService.findEmployeeById(employeeId);
  }

  async updateEmployee(employeeId, data) {
    const employeeExists = await CrudValidationService.findEmployeeById(employeeId);

    if (employeeExists.status) {
      return employeeExists;
    }

    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(data, employeeExists._id);
    if (validationResult) {
      return {
        status: validationResult.status,
        message: validationResult.message,
      };
    }

    const updatedEmployeeData = await Employee.findOneAndUpdate(
      { employeeId },
      data,
      { new: true }
    );

    if (!updatedEmployeeData) {
      return {
        status: 500,
        message: "Failed to update the employee.",
      };
    }

    return {
      status: 200,
      message: "Employee updated successfully.",
      data: updatedEmployeeData,
    };
  }


  async deleteEmployee(employeeId) {
    const employeeExists = await CrudValidationService.findEmployeeById(employeeId);

    if (employeeExists.status) {
      return employeeExists;
    }

    await Employee.findOneAndDelete({ employeeId });

    return {
      status: 200,
      message: `The Employee with ID: [${employeeId}] is deleted successfully.`,
    };
  }
}

export default new EmployeeService();
