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
      unique: true,
    },
  },
  {
    timestamps: true, // To save and manage createdAt and updatedAt data.
  }
);

// Pre-saving hook to auto-generate employeeId.
employeeSchema.pre('save', async function (next) {
  if (!this.employeeId) {
    const lastEmployee = await this.constructor.findOne().sort({ employeeId: -1 });
    this.employeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1;
  }
  next();
});

employeeSchema.plugin(mongoosePaginate); // Adding pagination plugin for the schema.

// Creating and exporting the Employee model based on the schema.
const Employee = mongoose.model("Employee", employeeSchema, "Employees");
export default Employee;
