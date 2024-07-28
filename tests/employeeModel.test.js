import mongoose from 'mongoose';
import Employee from '../model/employeeModel.js';

describe('Employee Model', () => {
  it('should create an Employee schema', () => {
    const employee = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+94123456789',
      gender: 'Male',
      employeeId: 1,
    });

    expect(employee).toHaveProperty('firstName', 'John');
    expect(employee).toHaveProperty('lastName', 'Doe');
    expect(employee).toHaveProperty('emailAddress', 'john.doe@example.com');
    expect(employee).toHaveProperty('phoneNumber', '+94123456789');
    expect(employee).toHaveProperty('gender', 'Male');
    expect(employee).toHaveProperty('employeeId', 1);
  });
});
