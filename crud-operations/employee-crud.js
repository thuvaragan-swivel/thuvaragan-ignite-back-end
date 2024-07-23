import Employee from "../model/employee-model.js";

// export const fetch = async (req, res) => {
//     try {
//         return res.json("Hello World!!!")
//     } catch (error) {
//         res.status(500).json({error: "Internal Server Error!"})
//     }
// }

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const { emailAddress } = newEmployee;

    const employeeExist = await Employee.findOne({ emailAddress });
    if (employeeExist) {
      console.log(
        `\nEmployee already exists in the system with the Email ID : ${emailAddress}!`
      );
      return res.status(400).json({
        message: `Employee already exists in the system with the Email ID : ${emailAddress}!`,
      });
    }

    const savedEmployeeData = await newEmployee.save();

    console.log(`\nCreated Employee Data -> ${savedEmployeeData}`);
    res.status(200).json(savedEmployeeData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employeeData = await Employee.find();

    if (!employeeData || employeeData.length === 0) {
      console.log("\nThe Employees Data is not Found in the System.");
      return res
        .status(404)
        .json({ message: "The Employees Data is not Found in the System." });
    }
    console.log(`\nAll Employees -> ${employeeData}`);
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeExists = await Employee.findById(id);

    if (!employeeExists) {
      console.log(
        `\nThe Employee with the ID: "${id}" is not Found in the System.`
      );
      return res.status(404).json({
        message: `The Employee with the ID: "${id}" is not Found in the System.`,
      });
    }
    console.log(`\nRetrieved Employee Data -> ${employeeExists}`);
    res.status(200).json(employeeExists);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeExists = await Employee.findById(id);

    if (!employeeExists) {
      console.log(
        `\nThe Employee with the ID: "${id}" is not Found in the System.`
      );
      return res.status(404).json({
        message: `The Employee with the ID: "${id}" is not Found in the System.`,
      });
    }

    const updatedEmployeeData = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(`\nUpdated Employee Data -> ${updatedEmployeeData}`);
    res.status(200).json(updatedEmployeeData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeExists = await Employee.findById(id);

    if (!employeeExists) {
      console.log(
        `\nThe Employee with the ID: "${id}" is not Found in the System.`
      );
      return res.status(404).json({
        message: `The Employee with the ID: "${id}" is not Found in the System.`,
      });
    }

    const deleteEmployeeData = await Employee.findByIdAndDelete(id);
    console.log(`\nUser "${deleteEmployeeData}" is deleted successfully.`);
    res
      .status(200)
      .json({ message: `User with ID : "${id}" is deleted successfully.` });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
