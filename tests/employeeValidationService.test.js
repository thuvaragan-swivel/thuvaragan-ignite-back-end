import EmployeeValidationService from '../services/validation-service/employeeValidationService';

describe('EmployeeValidationService', () => {
  it('should validate employee data and return null if data is valid', async () => {
    // Provide data within the validation constraints
    const data = {
      firstName: 'ValidName', // Adjusted length to fit within the 10 characters limit
      lastName: 'ValidLast',  // Adjusted length to fit within the 10 characters limit
      emailAddress: 'valid.email@example.com',
      phoneNumber: '+94123456789',
      gender: 'Male',
      employeeId: 123
    };
    const result = await EmployeeValidationService.validate(data);
    expect(result).toBeNull(); // Expect no validation errors
  });

  it('should return validation errors if data is invalid', async () => {
    // Provide incomplete data to trigger validation errors
    const data = {
      firstName: 'Short', // Invalid length
      lastName: 'Name',   // Invalid length
      // Missing required fields
    };
    const result = await EmployeeValidationService.validate(data);
    expect(result).toEqual({
      firstName: 'First Name must be at least 6 characters long!',
      lastName: 'Last Name must be at least 6 characters long!',
      emailAddress: 'Email Address is Required!',
      phoneNumber: 'Phone Number is Required!',
      gender: 'Gender is Required!',
      employeeId: 'Employee ID is Required!',
    });
  });
});
