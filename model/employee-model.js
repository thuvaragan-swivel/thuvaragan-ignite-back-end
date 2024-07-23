import mongoose from "mongoose";

const firstNameValidator = {
  validator: function (v) {
    return /^[A-Za-z]+$/.test(v);
  },
  message: (props) => `${props.value} is not a valid First Name!`,
};

const lastNameValidator = {
  validator: function (v) {
    return /^[A-Za-z]+$/.test(v);
  },
  message: (props) => `${props.value} is not a valid Last Name!`,
};

const phoneNumberValidator = {
  validator: function (v) {
    return /^\+94\d{9}$/.test(v);
  },
  message: (props) =>
    `${props.value} is not a valid Sri Lankan Phone Number! (Please start with +94)`,
};

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
      minlength: [6, "First Name must be at least 6 Characters!"],
      maxlength: [10, "First Name must be at most 10 Characters!"],
      validate: firstNameValidator,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
      minlength: [6, "Last Name must be at least 6 Characters"],
      maxlength: [10, "Last Name must be at most 10 Characters"],
      validate: lastNameValidator,
    },
    emailAddress: {
      type: String,
      required: [true, "Email Address is Required!"],
      match: [/\S+@\S+\.\S+/, "Email Address is Invalid!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is Required!"],
      validate: phoneNumberValidator,
    },
    gender: {
      type: String,
      required: true,
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
