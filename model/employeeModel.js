import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defining the employee schema.
const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    emailAddress: {
      type: String,
      required: [true, "Email Address is Required!"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is Required!"],
    },
    gender: {
      type: String,
      required: [true, "Gender is Required!"],
    },
    employeeId: {
      type: Number,
      required: [true, "Employee ID is Required!"],
      unique: true,
    },
  },
  {
    timestamps: true, // To save and manage createdAt and updatedAt data.
  }
);

employeeSchema.plugin(mongoosePaginate); // Adding pagination plugin for the schema.

// Creating and exporting the Employee model based on the schema.
const Employee = mongoose.model("Employee", employeeSchema, "Employees");
export default Employee;
