import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    timestamps: true,
  }
);

employeeSchema.plugin(mongoosePaginate);

const Employee = mongoose.model("Employee", employeeSchema, "Employees");
export default Employee;
