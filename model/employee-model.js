import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
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
