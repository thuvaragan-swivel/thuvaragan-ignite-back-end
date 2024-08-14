import {
    VALIDATION_MESSAGES,
    GENDER_VALUES,
    PAGINATION_DEFAULTS,
    STATUS_CODES,
    LOGGER_MESSAGES,
  } from '../../src/config/constantsConfig.js';
  
  describe('Constants Tests', () => {
    describe('Validation Messages', () => {
      test('Validation messages should be correctly defined', () => {
        expect(VALIDATION_MESSAGES.firstNameRequired).toBe('First Name is Required!');
        expect(VALIDATION_MESSAGES.firstNameAlpha).toBe('First Name must contain only Alphabets!');
        expect(VALIDATION_MESSAGES.firstNameMin).toBe('First Name must be at least 6 characters long!');
        expect(VALIDATION_MESSAGES.firstNameMax).toBe('First Name must be at most 10 characters long!');
        
        expect(VALIDATION_MESSAGES.lastNameRequired).toBe('Last Name is Required!');
        expect(VALIDATION_MESSAGES.lastNameAlpha).toBe('Last Name must contain only Alphabets!');
        expect(VALIDATION_MESSAGES.lastNameMin).toBe('Last Name must be at least 6 characters long!');
        expect(VALIDATION_MESSAGES.lastNameMax).toBe('Last Name must be at most 10 characters long!');
        
        expect(VALIDATION_MESSAGES.emailAddressRequired).toBe('Email Address is Required!');
        expect(VALIDATION_MESSAGES.emailAddressFormat).toBe('Email Address must be in the Format: username@domain.tld');
        expect(VALIDATION_MESSAGES.emailAddressPattern).toBe('Email Address must be in the Format: username@domain.tld');
        
        expect(VALIDATION_MESSAGES.phoneNumberRequired).toBe('Phone Number is Required!');
        expect(VALIDATION_MESSAGES.phoneNumberPattern).toBe('Phone Number must be a Valid Sri Lankan Phone Number!');
        
        expect(VALIDATION_MESSAGES.genderRequired).toBe('Gender is Required!');
        expect(VALIDATION_MESSAGES.genderAllowedValues).toBe("Gender must be either 'Male' or 'Female'!");
      });
    });
  
    describe('Gender Values', () => {
      test('Gender values should be correctly defined', () => {
        expect(GENDER_VALUES.male).toBe('Male');
        expect(GENDER_VALUES.female).toBe('Female');
      });
    });
  
    describe('Pagination & Sorting Defaults', () => {
      test('Pagination defaults should be correctly defined', () => {
        expect(PAGINATION_DEFAULTS.page).toBe(1);
        expect(PAGINATION_DEFAULTS.limit).toBe(12);
        expect(PAGINATION_DEFAULTS.sort).toBe('asc');
        expect(PAGINATION_DEFAULTS.sortBy).toBe('firstName');
      });
    });
  
    describe('HTTP Status Codes', () => {
      test('HTTP status codes should be correctly defined', () => {
        expect(STATUS_CODES.ok).toBe(200);
        expect(STATUS_CODES.created).toBe(201);
        expect(STATUS_CODES.badRequest).toBe(400);
        expect(STATUS_CODES.notFound).toBe(404);
        expect(STATUS_CODES.internalServerError).toBe(500);
      });
    });
  
    describe('Logger Messages', () => {
      test('Logger messages should be correctly defined', () => {
        const testId = 123;
        const testError = 'Test Error';
  
        expect(LOGGER_MESSAGES.employeeCreateSuccess(testId)).toBe(`New Employee Created with ID: ${testId}\n`);
        expect(LOGGER_MESSAGES.employeeUpdateSuccess(testId)).toBe(`Updated Employee with ID: ${testId}\n`);
        expect(LOGGER_MESSAGES.employeeDeleteSuccess(testId)).toBe(`Deleted Employee with ID: ${testId}\n`);
        expect(LOGGER_MESSAGES.employeeFetchSuccess(testId)).toBe(`Fetched Employee with ID: ${testId}\n`);
        
        expect(LOGGER_MESSAGES.employeeFetchError(testError)).toBe(`Error Fetching Employee: ${testError}\n`);
        expect(LOGGER_MESSAGES.employeeCreateError(testError)).toBe(`Error Creating Employee: ${testError}\n`);
        expect(LOGGER_MESSAGES.employeeUpdateError(testError)).toBe(`Error Updating Employee: ${testError}\n`);
        expect(LOGGER_MESSAGES.employeeDeleteError(testError)).toBe(`Error Deleting Employee: ${testError}\n`);
        expect(LOGGER_MESSAGES.employeesFetchError(testError)).toBe(`Error Fetching Employees: ${testError}\n`);
        
        const validationErrors = { firstName: "First Name is Required!" };
        expect(LOGGER_MESSAGES.employeeValidationFailed(validationErrors)).toBe(
          `Validation Failed:\n${JSON.stringify(validationErrors, null, 2)}\n`
        );
      });
    });
  });
  