const express = require("express");
const departmentsRouter = express.Router();
const departmentsBLL = require("../BLL/departmentsBLL");
const checkAndUpdateActions = require("../utils/updateActions");

// Main Entry Point: localhost:port/departments

// Action: GET
// Entry Point: localhost:port/departments/edit/:id
// Info: Obtain requested department's information for edit
departmentsRouter.get("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.getDepartmentByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).send(err.name);
  }
});

// Action: PUT
// Entry Point: localhost:port/departments/edit/:id
// Info: Update a department with new information
// TODO Removed checkAndUpdateActions middleware here
departmentsRouter.put("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.updateDepartmentByID(
      req.params.id,
      req.body
    );
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).json("Invalid data was entered!");
  }
});

// Action: DELETE
// Entry Point: localhost:port/departments/edit/:id
// Info: Delete requested department from collection by id field
// TODO Removed checkAndUpdateActions middleware here

departmentsRouter.delete("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.deleteDepartmentByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(501).send(err.name);
  }
});

// Action: POST
// Entry Point: localhost:port/departments/new
// Info: Create new department and send it to the mongo db
// TODO Removed checkAndUpdateActions middleware here

departmentsRouter.post("/new", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.addDepartment(req.body);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(501).send(err.name);
  }
});

// Action: GET
// Entry Point: localhost:port/departments
// Info: Get all departments including (manager, list of employees)
departmentsRouter.get("/", async (req, res) => {
  const departments = await departmentsBLL.getAllDepartments();
  res.status(201).send(departments);
});

module.exports = departmentsRouter;
