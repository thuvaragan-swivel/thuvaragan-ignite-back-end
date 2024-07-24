import mongoose from "mongoose";

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
      type: String,
      required: [true, "Employee ID is Required!"],
    },
    photoImg: {
      type: Buffer,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

export default mongoose.model("Employee", employeeSchema, "Employees");
