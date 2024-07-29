// employeeValidationService.test.js

import EmployeeValidationService from "../services/validation-service/employeeValidationService";

describe("EmployeeValidationService", () => {
  it("should validate employee data and return null if data is valid", async () => {
    // Providing data within the validation constraints.
    const data = {
      firstName: "Jonathan", // Adjusted length to fit within the 10 characters limit.
      lastName: "Davidson", // Adjusted length to fit within the 10 characters limit.
      emailAddress: "jon.dav@gmail.com",
      phoneNumber: "+94123456789",
      gender: "Male",
      employeeId: 123,
    };
    const result = await EmployeeValidationService.validate(data);
    expect(result).toBeNull(); // Expecting no validation errors.
  });

  it("should return validation errors if data is invalid", async () => {
    // Providing incomplete data to trigger validation errors.
    const data = {
      firstName: "Jon", // Invalid length.
      lastName: "Dav", // Invalid length.
      phoneNumber: "0773456789", //Invalid format.
      // Leaving the other required fields as missing.
    };
    const result = await EmployeeValidationService.validate(data);
    expect(result).toEqual({
      firstName: "First Name must be at least 6 characters long!",
      lastName: "Last Name must be at least 6 characters long!",
      emailAddress: "Email Address is Required!",
      phoneNumber: "Phone Number must be a Valid Sri Lankan Phone Number!",
      gender: "Gender is Required!",
      employeeId: "Employee ID is Required!",
    });
  });
});
