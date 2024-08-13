import Employee from "../../src/model/employeeModel.js";

describe("Employee Model", () => {
  it("should create an Employee schema", () => {
    const employee = new Employee({
      firstName: "Jonathan",
      lastName: "Davidson",
      emailAddress: "jon.dav@gmail.com",
      phoneNumber: "+94123456789",
      gender: "Male",
      employeeId: 1,
    });

    expect(employee).toHaveProperty("firstName", "Jonathan");
    expect(employee).toHaveProperty("lastName", "Davidson");
    expect(employee).toHaveProperty("emailAddress", "jon.dav@gmail.com");
    expect(employee).toHaveProperty("phoneNumber", "+94123456789");
    expect(employee).toHaveProperty("gender", "Male");
    expect(employee).toHaveProperty("employeeId", 1);
  });
});
