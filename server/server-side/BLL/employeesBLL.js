// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");
const mongoose = require("mongoose");

// Get employee with department and shift list (by ID)
const getEmployeeByID = async (id) => {
  const employee = await employeeModel
    .findById(id)
    .populate({
      path: "departmentID",
    })
    .populate({
      path: "shifts",
      options: {
        sort: { date: -1 },
      },
    });
  return employee;
};
// Get all employees with department and shift list
const getAllEmployees = async () => {
  const employees = await employeeModel
    .find()
    .populate({
      path: "departmentID",
    })
    .populate({
      path: "shifts",
      options: {
        sort: { date: -1 },
      },
    });
  return employees;
};

// Delete an employee by his id field in the employees collection
const deleteEmployeeByID = async (id) => {
  const employee = await getEmployeeByID(id);
  if (employee === null) {
    console.log(
      `EmployeesBLL: deleteEmployeeByID: The employee (id: ${id}) doesn't exist in the system!`
    );
    return `The employee (id: ${id}) doesn't exist in the system!`;
  }
  await employeeModel.deleteOne({ _id: id });
  console.log(
    `EmployeesBLL: deleteEmployeeByID: The employee (id: ${id}) is deleted from the system!`
  );
  return `The employee is deleted from the system!`;
};

// Update an employee by his id field in the employees collection
const updateEmployeeByID = async (id, data) => {
  let department = null;
  data["departmentID"] = data.departmentID._id;

  const response = await employeeModel
    .findOneAndUpdate({ _id: id }, data)
    .then(() => {
      console.log(`Employee (id: ${id}) information was updated in the system`);
      return `Employee (id: ${id}) information was updated in the system`;
    })
    .catch((err) => {
      console.log(
        `EmployeeBLL: updateEmployeeByID: Error updating employee's (id: ${id}) information in the system! errorMEssage:${err.message}`
      );
      return `Updated employee's (id: ${id}) information in the system! ${err}`;
    });

  return response;
};

const addEmployee = async (employeeData) => {
  let department = null;
  try {
    department = await departmentModel.find({
      name: employeeData.departmentName,
    });
    employeeData["departmentID"] = department[0]._id;
  } catch (err) {
    console.log(
      `EmployeeBLL: addEmployee: Error finding given department by user, errorMessage:${err.message}`
    );
    return "There is an error in the department field!";
  }

  try {
    const employee = new employeeModel(employeeData);
    await employee.save();
  } catch (err) {
    console.log(
      `EmployeeBLL: addEmployee: Failed Adding new employee! errMessage:${err.message}`
    );
    return `Failed adding new employee!`;
  }
  console.log("EmployeeBLL: addEmployee: New employee inserted!");
  return "New employee inserted!";
};

// Filter employees not in a certain department
const getAllEmployeesNotInDepartment = async (departmentID) => {
  const notInDepartment = { departmentID: { $ne: departmentID } };
  // Filter employees not in the Sales department
  const employees = await employeeModel.find({
    departmentID: notInDepartment.departmentID,
  });

  return employees;
};

// Filter employees not in a certain shift
const getAllEmployeesNotInShift = async (shiftID) => {
  const employees = await employeeModel.find({
    shifts: {
      $not: {
        $elemMatch: {
          $eq: new mongoose.Types.ObjectId(shiftID),
        },
      },
    },
  });

  return employees;
};

const removeDepartment = async (departmentID) => {
  // Convert departmentID to ObjectId
  const departmentObjectId = new mongoose.Types.ObjectId(departmentID);

  // Update all employees, setting departmentID to null
  await employeeModel.updateMany(
    {
      departmentID: departmentObjectId,
    },
    {
      departmentID: "6523c5feede9cb34c54ca21d", // Default department
    }
  );

  return "Department was deleted for all corresponding employees";
};

const updateEmployeeDepartment = async (employeeID, data) => {
  const departmentID = { departmentID: data.departmentID };
  await employeeModel
    .findOneAndUpdate({ _id: employeeID }, departmentID)
    .then(() => {
      return "Department updated!";
    })
    .catch((err) => {
      console.log(
        `EmployeeBLL: updateEmployeeDepartment: Error updating employee's (id: ${id}) department in the system! errorMEssage:${err.message}`
      );
      return `Updated employee's (id: ${id}) department in the system! ${err}`;
    });
};

const updateEmployeeShift = async (employeeID, data) => {

const newShiftId = data.shiftID; 

await employeeModel.updateOne(
    { _id: employeeID },
    {
      $push: {
        shifts: new mongoose.Types.ObjectId(newShiftId),
      },
    }
  )
};

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  deleteEmployeeByID,
  updateEmployeeByID,
  addEmployee,
  getAllEmployeesNotInDepartment,
  updateEmployeeDepartment,
  removeDepartment,
  getAllEmployeesNotInShift,
  updateEmployeeShift,
};
