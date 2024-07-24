import Employee from "../model/employee-model.js";
import EmployeeValidationService from "../validation/employee-validation-service.js";

// Create an Employee data.
export const createEmployee = async (req, res) => {
  try {
    const validationResult = await validateAndCheckExistingEmployee(req.body);
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

// Retrieve all Employees data.
export const getAllEmployees = async (req, res) => {
  try {
    const employeeData = await Employee.find();

    if (!employeeData || employeeData.length === 0) {
      return res
        .status(404)
        .json({ message: "No Employees found in the system!" });
    }
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Retrieve an Employee data using employeeId.
export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeExists = await findEmployeeById(employeeId);

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
    const employeeId = req.params.id;

    const employeeExists = await findEmployeeById(employeeId);
    if (employeeExists.status) {
      return res
        .status(employeeExists.status)
        .json({ message: employeeExists.message });
    }

    const validationResult = await validateAndCheckExistingEmployee(
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
    const employeeId = req.params.id;
    const employeeExists = await findEmployeeById(employeeId);

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

// To validate and check for existing Email and Employee ID.
const validateAndCheckExistingEmployee = async (data, id = null) => {
  const validationErrors = await EmployeeValidationService.validate(data);
  if (validationErrors) {
    return {
      status: 400,
      message: validationErrors.join(", "),
    };
  }
  const { emailAddress, employeeId } = data;

  // Checking for existing email address.
  const emailAddressExist = await Employee.findOne({
    emailAddress,
    ...(id && { _id: { $ne: id } }), // Exclude current employee if updating...
  });
  if (emailAddressExist) {
    return {
      status: 400,
      message: `An Employee already exists with the Email ID: ${emailAddress}!`,
    };
  }

  // Checking for existing employee ID.
  const employeeIdExist = await Employee.findOne({
    employeeId,
    ...(id && { _id: { $ne: id } }), // Exclude current employee if updating....
  });
  if (employeeIdExist) {
    return {
      status: 400,
      message: `An Employee already exists with the Employee ID: [${employeeId}]!`,
    };
  }

  return null; // No errors.
};

// To check if an employee exists in the database using employeeId.
const findEmployeeById = async (employeeId) => {
  const employeeExists = await Employee.findOne({ employeeId });
  if (!employeeExists) {
    return {
      status: 404,
      message: `The Employee with the ID: [${employeeId}] is not Found in the System!`,
    };
  }
  return employeeExists;
};
