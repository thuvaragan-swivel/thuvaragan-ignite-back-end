import Employee from "../model/employee-model.js";
import EmployeeValidationService from "../validation/employee-validation-service.js";

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

    res.status(200).json(savedEmployeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employeeData = await Employee.find();

    if (!employeeData || employeeData.length === 0) {
      return res
        .status(404)
        .json({ message: "The Employees Data is not Found in the System!" });
    }
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

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

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeExists = await findEmployeeById(employeeId);

    if (employeeExists.status) {
      return res
        .status(employeeExists.status)
        .json({ message: employeeExists.message });
    }

    const deleteEmployeeData = await Employee.findOneAndDelete({ employeeId });

    res.status(200).json({
      message: `The Employee with ID: [${employeeId}] is deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Helper function to validate and check for existing email and employee ID
const validateAndCheckExistingEmployee = async (data, id = null) => {
  const validationErrors = await EmployeeValidationService.validate(data);
  if (validationErrors) {
    return {
      status: 400,
      message: validationErrors.join(", "),
    };
  }

  const { emailAddress, employeeId } = data;

  // Check for existing email address
  const emailAddressExist = await Employee.findOne({
    emailAddress,
    ...(id && { _id: { $ne: id } }), // Exclude current employee if updating
  });
  if (emailAddressExist) {
    return {
      status: 400,
      message: `An Employee already exists with the Email ID: ${emailAddress}!`,
    };
  }

  // Check for existing employee ID
  const employeeIdExist = await Employee.findOne({
    employeeId,
    ...(id && { _id: { $ne: id } }), // Exclude current employee if updating
  });
  if (employeeIdExist) {
    return {
      status: 400,
      message: `An Employee already exists with the Employee ID: [${employeeId}]!`,
    };
  }

  return null; // No errors
};

// Helper function to check if an employee exists by employeeId
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
