import Employee from "../model/employee-model.js";
import CrudValidationService from "../validation/crud-validation-service.js";

// Create an Employee data.
export const createEmployee = async (req, res) => {
  try {
    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(req.body);
    if (validationResult) {
      return res.status(validationResult.status).json({
        message: validationResult.message,
      });
    }

    const newEmployee = new Employee(req.body);
    const savedEmployeeData = await newEmployee.save();

    res.status(201).json(savedEmployeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Retrieve all Employees data with search, sort, and pagination options.
export const getAllEmployees = async (req, res) => {
  try {
    const { search, sort = "asc", page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      // Attempt to parse the search term as a number for employeeId
      const searchNumber = parseInt(search, 10);

      if (!isNaN(searchNumber)) {
        query.$or = [
          { employeeId: searchNumber }, // Direct match for numeric employeeId
        ];
      } else {
        // If it's not a number, apply regex search for other fields
        query.$or = [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { emailAddress: { $regex: search, $options: "i" } },
        ];
      }
    }

    const sortOrder = sort === "desc" ? -1 : 1;

    const employees = await Employee.find(query)
      .sort({ firstName: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Employee.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      data: employees,
      pagination: {
        totalCount,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Retrieve an Employee data using employeeId.
export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    if (employeeExists.status) {
      return res
        .status(employeeExists.status)
        .json({ message: employeeExists.message });
    }
    res.status(200).json(employeeExists);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update an Employee data using employeeId.
export const updateEmployee = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id, 10);

    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );
    if (employeeExists.status) {
      return res
        .status(employeeExists.status)
        .json({ message: employeeExists.message });
    }

    const validationResult =
      await CrudValidationService.validateAndCheckExistingEmployee(
        req.body,
        employeeExists._id
      );
    if (validationResult) {
      return res
        .status(validationResult.status)
        .json({ message: validationResult.message });
    }

    const updatedEmployeeData = await Employee.findOneAndUpdate(
      { employeeId },
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEmployeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete an Employee data using employeeId.
export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const employeeExists = await CrudValidationService.findEmployeeById(
      employeeId
    );

    if (employeeExists.status) {
      return res
        .status(employeeExists.status)
        .json({ message: employeeExists.message });
    }

    await Employee.findOneAndDelete({ employeeId });

    res.status(200).json({
      message: `The Employee with ID: [${employeeId}] is deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
