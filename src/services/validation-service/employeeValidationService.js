import * as yup from "yup";

// This is for the Employee Data Validation.
// Handling validation using Yup.
class EmployeeValidationService {
  // Defining the Yup schema for employee data validation.
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
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email Address must be in the Format: username@domain.tld"
      ),

    phoneNumber: yup
      .string()
      .required("Phone Number is Required!")
      .matches(
        /^\+94\d{9}$/,
        "Phone Number must be a Valid Sri Lankan Phone Number!"
      ),

    gender: yup
      .string()
      .required("Gender is Required!")
      .oneOf(["Male", "Female"], "Gender must be either 'Male' or 'Female'!"),
  });

  static async validate(data) {
    try {
      // Validating the data against the schema;
      await this.employeeValidationSchema.validate(data, { abortEarly: false }); // { abortEarly: false } basically collects all errors.
      return null;
    } catch (error) {
      // Handling validation errors.
      if (error.name === "ValidationError") {
        // Converting validation errors to a more readable format.
        const errors = error.inner.reduce((acc, curr) => {
          if (!acc[curr.path]) {
            acc[curr.path] = curr.message;
          }
          return acc;
        }, {});
        return errors; // Returning the formatted errors.
      }
      throw error; // Throwing error if it's not a validation error.
    }
  }
}

export default EmployeeValidationService;
