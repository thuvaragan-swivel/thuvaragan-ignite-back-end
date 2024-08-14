import Employee from "../../src/model/employeeModel.js";

describe("Employee Model", () => {
  it("should create an Employee schema and exclude unwanted fields in JSON output", () => {
    const employee = new Employee({
      firstName: "Jonathan",
      lastName: "Davidson",
      emailAddress: "jon.dav@gmail.com",
      phoneNumber: "+94123456789",
      gender: "Male",
      employeeId: 1,
    });

    // Converting to JSON to apply the toJSON transformation.
    const employeeJson = employee.toJSON();

    // Checking for the expected properties.
    expect(employeeJson).toHaveProperty("firstName", "Jonathan");
    expect(employeeJson).toHaveProperty("lastName", "Davidson");
    expect(employeeJson).toHaveProperty("emailAddress", "jon.dav@gmail.com");
    expect(employeeJson).toHaveProperty("phoneNumber", "+94123456789");
    expect(employeeJson).toHaveProperty("gender", "Male");
    expect(employeeJson).toHaveProperty("employeeId", 1);

    // Ensuring that the unwanted fields are not present.
    expect(employeeJson).not.toHaveProperty("_id");
    expect(employeeJson).not.toHaveProperty("__v");
    expect(employeeJson).not.toHaveProperty("updatedAt");
  });
});
