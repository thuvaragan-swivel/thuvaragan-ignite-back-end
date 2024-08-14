import * as yup from "yup";
import {
  VALIDATION_MESSAGES,
  GENDER_VALUES,
  REGEX_PATTERNS,
} from "../../config/constantsConfig.js";

// This is for the Employee Data Validation.
// Handling validation using Yup.
class EmployeeValidationService {
  // Defining the Yup schema for employee data validation.
  static employeeValidationSchema = yup.object({
    firstName: yup
      .string()
      .required(VALIDATION_MESSAGES.firstNameRequired)
      .matches(REGEX_PATTERNS.NAME, VALIDATION_MESSAGES.firstNameAlpha)
      .min(6, VALIDATION_MESSAGES.firstNameMin)
      .max(10, VALIDATION_MESSAGES.firstNameMax),

    lastName: yup
      .string()
      .required(VALIDATION_MESSAGES.lastNameRequired)
      .matches(REGEX_PATTERNS.NAME, VALIDATION_MESSAGES.lastNameAlpha)
      .min(6, VALIDATION_MESSAGES.lastNameMin)
      .max(10, VALIDATION_MESSAGES.lastNameMax),

    emailAddress: yup
      .string()
      .required(VALIDATION_MESSAGES.emailAddressRequired)
      .email(VALIDATION_MESSAGES.emailAddressFormat)
      .matches(REGEX_PATTERNS.EMAIL, VALIDATION_MESSAGES.emailAddressPattern),

    phoneNumber: yup
      .string()
      .required(VALIDATION_MESSAGES.phoneNumberRequired)
      .matches(REGEX_PATTERNS.PHONE, VALIDATION_MESSAGES.phoneNumberPattern),

    gender: yup
      .string()
      .required(VALIDATION_MESSAGES.genderRequired)
      .oneOf(
        [GENDER_VALUES.male, GENDER_VALUES.female],
        VALIDATION_MESSAGES.genderAllowedValues
      ),
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
