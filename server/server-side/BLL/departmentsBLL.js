// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");

// Get department and the associated manager (by ID)
const getDepartmentByID = async (id) => {
  const department = await departmentModel
    .findById(id)
    .populate("manager")
  return department;
};

// Delete a department by the id field in the departments collection
const deleteDepartmentByID = async (id) => {
  const department = await getDepartmentByID(id);
  if (department === null) {
    console.log(
      `DepartmentBLL: deleteDepartmentByID: The department (id: ${id}) doesn't exist in the system!`
    );
    return `The department (id: ${id}) doesn't exist in the system!`;
  }
  await departmentModel.deleteOne({ _id: id });

  console.log(
    `DepartmentBLL: deleteDepartmentByID: The department (id: ${id}) is deleted from the system!`
  );
  return `The department (id: ${id}) is deleted from the system!`;
};

// Update a department by the id field in the departments collection
const updateDepartmentByID = async (id, data) => {
  const response = await departmentModel
    .findOneAndUpdate({ _id: id }, data)
    .then(() => {
      console.log(
        `DepartmentBLL: updateDepartmentByID: Department (id: ${id}) has been updated in the database!`
      );
      return `Department (id: ${id}) has been updated in the database!`;
    })
    .catch((err) => {
      console.log(
        `DepartmentBLL: updateDepartmentByID: Error updating department's (id: ${id}) information in the system! errorMEssage:${err.message}`
      );
      return `Error updating department's (id: ${id}) information in the system!`;
    });

  return response;
};

// Add a new department to the system
const addDepartment = async (departmentData) => {
  const result = await departmentModel.find({ name: departmentData.name })

  if(result.length > 0)
    return 'Department name already exists in the system!'
  try {
    const department = new departmentModel(departmentData);
    await department.save();
  } catch (err) {
    console.log(
      `DepartmentBLL: addDepartmentBLL: Failed Adding new department! errMessage:${err.message}`
    );
    return `Failed adding new department!`;
  }
  console.log("DepartmentBLL: addDepartmentBLL: New department inserted!");
  return "New department inserted!";
};

// Get all departments including (manager, list of employees)
const getAllDepartments = async () => {
  const departments = await departmentModel.aggregate([
    [
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "departmentID",
          as: "employees",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "manager",
          foreignField: "_id",
          as: "manager",
        },
      },
    ],
  ]);
  return departments;
};

module.exports = {
  getAllDepartments,
  getDepartmentByID,
  deleteDepartmentByID,
  updateDepartmentByID,
  addDepartment,
};
