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
      .required("Email Address is Required!")
      .email("Email Address must be in the Format: username@domain.tld")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email Address must be in the Format: username@domain.tld"
      ),

    phoneNumber: yup
      .string()
      .required("Phone Number is Required!")
      .matches(
        /^\+94\d{9}$/,
        "Phone Number must be a Valid Sri Lankan Phone Number!"
      ),

    gender: yup.string().required("Gender is Required!"),

    employeeId: yup
      .number()
      .required("Employee ID is Required!")
      .typeError("Employee ID must be a number!"),
  });

  static async validate(data) {
    try {
      await this.employeeValidationSchema.validate(data, { abortEarly: false });
      return null;
    } catch (error) {
      if (error.name === "ValidationError") {
        // Ensure that required errors are shown first
        const errors = error.inner.reduce((acc, curr) => {
          if (!acc[curr.path]) {
            acc[curr.path] = curr.message;
          }
          return acc;
        }, {});
        return errors;
      }
      throw error;
    }
  }
}

export default EmployeeValidationService;
