import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { VALIDATION_MESSAGES } from "../config/constantsConfig.js";

// Defining the employee schema.
const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, VALIDATION_MESSAGES.firstNameRequired],
    },
    lastName: {
      type: String,
      required: [true, VALIDATION_MESSAGES.lastNameRequired],
    },
    emailAddress: {
      type: String,
      required: [true, VALIDATION_MESSAGES.emailAddressRequired],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, VALIDATION_MESSAGES.phoneNumberRequired],
    },
    gender: {
      type: String,
      required: [true, VALIDATION_MESSAGES.genderRequired],
    },
    employeeId: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true, // To save and manage createdAt and updatedAt data.

    toJSON: {
      transform: (doc, ret) => {
        // Removing unwanted fields from the output.
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;

        // Reordering fields in the output.
        return {
          firstName: ret.firstName,
          lastName: ret.lastName,
          emailAddress: ret.emailAddress,
          phoneNumber: ret.phoneNumber,
          gender: ret.gender,
          employeeId: ret.employeeId,
          createdAt: ret.createdAt,
        };
      },
    },
  }
);

// Pre-saving hook to auto-generate employeeId.
employeeSchema.pre("save", async function (next) {
  if (!this.employeeId) {
    const lastEmployee = await this.constructor
      .findOne()
      .sort({ employeeId: -1 });
    this.employeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1;
  }
  next();
});

employeeSchema.plugin(mongoosePaginate); // Adding pagination plugin for the schema.

// Creating and exporting the Employee model based on the schema.
const Employee = mongoose.model("Employee", employeeSchema, "Employees");
export default Employee;
