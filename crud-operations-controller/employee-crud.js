import Employee from "../model/employee-model.js";
import CrudValidationService from "../validation/crud-validation-service.js";

// Create an Employee data.
export const createEmployee = async (req, res) => {
  try {
    const validationResult = await CrudValidationService.validateAndCheckExistingEmployee(req.body);
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
      return res.status(404).json({ message: "No Employees found in the system!" });
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
    const employeeExists = await CrudValidationService.findEmployeeById(employeeId);

    if (employeeExists.status) {
      return res.status(employeeExists.status).json({ message: employeeExists.message });
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

    const employeeExists = await CrudValidationService.findEmployeeById(employeeId);
    if (employeeExists.status) {
      return res.status(employeeExists.status).json({ message: employeeExists.message });
    }

    const validationResult = await CrudValidationService.validateAndCheckExistingEmployee(req.body, employeeExists._id);
    if (validationResult) {
      return res.status(validationResult.status).json({ message: validationResult.message });
    }

    const updatedEmployeeData = await Employee.findOneAndUpdate({ employeeId }, req.body, { new: true });

    res.status(200).json(updatedEmployeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete an Employee data using employeeId.
export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeExists = await CrudValidationService.findEmployeeById(employeeId);

    if (employeeExists.status) {
      return res.status(employeeExists.status).json({ message: employeeExists.message });
    }

    await Employee.findOneAndDelete({ employeeId });

    res.status(200).json({
      message: `The Employee with ID: [${employeeId}] is deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
