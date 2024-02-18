const express = require("express");
const employeesRouter = express.Router();
const employeesBLL = require("../BLL/employeesBLL");
const checkAndUpdateActions = require("../utils/updateActions")

// Main Entry Point: localhost:port/employees

// Action: GET
// Entry Point: localhost:port/employees/edit/:id
// Info: Obtain requested employee's information for edit
employeesRouter.get("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.getEmployeeByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).send(err.name);
  }
});

// Action: GET
// Entry Point: localhost:3000/employees/not_in/shift/:id
// Info: Get all employees data that are not in a specific shift
employeesRouter.get("/not_in/shift/:id", async (req, res) => {
  try {
    const employees = await employeesBLL.getAllEmployeesNotInShift(
      req.params.id
    );
    res.status(201).send(employees);
  } catch (err) {
    console.log(`EmployeesRouter : ${err.message}`);
    res.status(501).send(`${err.message}`);
  }
});

// Action: PUT
// Entry Point: localhost:port/employees/edit/:id
// Info: Update an employee with new information
// TODO Removed checkAndUpdateActions middleware here
employeesRouter.put("/edit/:id" ,async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.updateEmployeeByID(
      req.params.id,
      req.body
    );
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).json("Invalid data was entered!");
  }
});

// Action: DELETE
// Entry Point: localhost:port/employees/edit/:id
// Info: Delete requested employee from collection by _id field
// TODO Removed checkAndUpdateActions middleware here
employeesRouter.delete("/edit/:id" ,async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.deleteEmployeeByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(501).send(err.name);
  }
});

// Action: POST
// Entry Point: localhost:port/employees/new
// Info: Create new employee and send it to the collection
// TODO Removed checkAndUpdateActions middleware here
employeesRouter.post("/new" ,async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.addEmployee(req.body);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(501).send(err.name);
  }
});

// Action: PUT
// Entry Point: localhost:port/employees/remove/department/:id
// Info: Delete department from all employees documents
employeesRouter.put("/remove/department/:id", async (req,res) => {
  try {
    const response = await employeesBLL.removeDepartment(req.params.id);
    res.status(201).json(response);
  } catch (err) {
    console.log(`EmployeesRouter : ${err.message}`);
    res.status(501).send(`${err.message}`);
  }
})

// Action: GET
// Entry Point: localhost:port/employees
// Info: Get all employees data (Full name, Department and his shifts)
employeesRouter.get("/", async (req, res) => {
  const employees = await employeesBLL.getAllEmployees();
  res.status(201).send(employees);
});

// Action: GET
// Entry Point: localhost:port/employees/not_in/department/:id
// Info: Get all employees data that are not in a specific department
employeesRouter.get("/not_in/department/:id", async (req, res) => {
  try {
    const employees = await employeesBLL.getAllEmployeesNotInDepartment(
      req.params.id
    );
    res.status(201).send(employees);
  } catch (err) {
    console.log(`EmployeesRouter : ${err.message}`);
    res.status(501).send(`${err.message}`);
  }
});

// Action: GET
// Entry Point: localhost:port/employees/:id/switch/department/
// Info: Get all employees data that are not in a specific department
// TODO Removed checkAndUpdateActions middleware here
employeesRouter.put("/:id/switch/department/" ,async (req, res) => {
  try {
    const response = await employeesBLL.updateEmployeeDepartment(
      req.params.id,
      req.body
    );
    console.log(
      `EmployeesRouter : Department switched for employee ${req.params.id}`
    );
    res.json(`Department switched for employee ${req.params.id}`);
  } catch (err) {
    console.log(
      `EmployeesRouter : Switching departments for employee ${req.params.id} failed! message:${err.message}`
    );
    res
      .status(501)
      .send(
        `Switching departments for employee ${req.params.id} failed! message:${err.name}`
      );
  }
});

// Action: GET
// Entry Point: localhost:port/employees/:id/switch/shift/
// Info: Get all employees data that are not in a specific department
// TODO Removed checkAndUpdateActions middleware here

employeesRouter.put("/:id/switch/shift/" ,async (req, res) => {
  try {
    const response = await employeesBLL.updateEmployeeShift(
      req.params.id,
      req.body
    );
    console.log(
      `EmployeesRouter : Employee ${req.params.id} was add to the shift`
    );
    res.json(`EmployeesRouter : Employee ${req.params.id} was add to the shift`);
  } catch (err) {
    console.log(
      `EmployeesRouter : Adding employee to shift ${req.params.id} failed! message:${err.message}`
    );
    res
      .status(501)
      .send(
        `Adding employee to shift ${req.params.id} failed! message:${err.name}`
      );
  }

});

module.exports = employeesRouter;
