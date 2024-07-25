import * as yup from "yup";

// This is for the Employee Data Validation.
class EmployeeValidationService {
  static employeeValidationSchema = yup.object({
    firstName: yup
      .string()
      .required("First Name is Required!")
      .matches(/^[A-Za-z]+$/, "First Name must contain only Alphabets!")
      .min(6, "First Name must be at least 6 characters long!")
      .max(10, "First Name must be at most 10 characters long!"),

    lastName: yup
      .string()
      .required("Last Name is Required!")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only Alphabets!")
      .min(6, "Last Name must be at least 6 characters long!")
      .max(10, "Last Name must be at most 10 characters long!"),

    emailAddress: yup
      .string()
      .email("Email Address must be Valid!")
      .required("Email Address is Required!")
      .test("contains-at", "Email Address must contain [ @ ]", (value) =>
        value.includes("@")
      )
      .test("contains-dot", "Email Address must contain [ . ]", (value) =>
        value.includes(".")
      )
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email Address must be in the Format: username@domain.tld"
      ),

    phoneNumber: yup
      .string()
      .matches(
        /^\+94\d{9}$/,
        "Phone Number must be a Valid Sri Lankan Phone Number!"
      )
      .required("Phone Number is Required!"),

    gender: yup.string().required("Gender is Required!"),

    employeeId: yup
      .number()
      .typeError("Employee ID must be a number!")
      .required("Employee ID is Required!"),

    // photoImg: yup.mixed(),
  });

  static async validate(data) {
    try {
      await this.employeeValidationSchema.validate(data, { abortEarly: false });
      return null;
    } catch (error) {
      if (error.name === "ValidationError") {
        return error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
      }
      throw error;
    }
  }
}

export default EmployeeValidationService;