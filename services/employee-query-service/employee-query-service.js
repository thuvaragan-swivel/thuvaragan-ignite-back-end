import Employee from "../../model/employee-model.js";

class EmployeeQueryService {
  async getAllEmployees({ search, sort = "asc", page = 1, limit = 10, sortBy = 'firstName' }) {
    const query = {};

    if (search) {
      const searchNumber = parseInt(search, 10);
      if (!isNaN(searchNumber)) {
        query.$or = [{ employeeId: searchNumber }];
      } else {
        query.$or = [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { emailAddress: { $regex: search, $options: "i" } },
        ];
      }
    }

    const sortOrder = sort === "desc" ? -1 : 1;

    const sortCriteria = {};
    if (sortBy === 'createdAt') {
      sortCriteria.createdAt = sortOrder;
    } else {
      sortCriteria.firstName = sortOrder;
    }

    const employees = await Employee.find(query)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Employee.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      status: 200,
      data: employees,
      pagination: {
        totalCount,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
      },
    };
  }
}

export default new EmployeeQueryService();