import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const DepartmentsEditPage = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [managerID, setManagerID] = useState("");
  const [managerFullName, setManagerFullName] = useState("");
  const [employeesNotInDepartment, setEmployeesNotInDepartment] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const id = sessionStorage.getItem("editDepartmentID");
      buildSelectedDepartmentInformation(id);
      buildNoneDepartmentEmployeesList(id);
    }
  }, []);

  const buildSelectedDepartmentInformation = async (id) => {
    // TODO Change to web server here

    const response = await fetch(
      `https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/departments/edit/${id}`,
      { headers: { Authorization: `Bearer ${user.token}` }, method: "GET" }
    );
    const department = await response.json();

    setDepartmentName(department.name);
    setDepartmentID(department._id);
    setManagerID(department.manager._id);
    setManagerFullName(
      `${department.manager.firstName} ${department.manager.lastName}`
    );
  };

  const buildNoneDepartmentEmployeesList = async (id) => {
    // TODO Change to web server here

    const response = await fetch(
      `https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/employees/not_in/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const employees = await response.json();

    setEmployeesNotInDepartment(employees);
  };

  const updateDepartment = async () => {
    const data = {
      name: departmentName,
      manager: managerID,
    };

    try {
      // TODO Change to web server here

      const response = await fetch(
        `https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/departments/edit/${departmentID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to update department:", error);
      setResponseMessage("An error occurred while updating the department.");
    }
  };

  const deleteDepartment = async () => {
    try {
      // TODO Change to web server here

      const response = await fetch(
        `https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/departments/edit/${departmentID}`,
        { headers: { Authorization: `Bearer ${user.token}` }, method: "DELETE" }
      );
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to delete department:", error);
      setResponseMessage("An error occurred while deleting the department.");
    }
  };

  const addEmployeeToDepartment = async () => {
    if (!selectedEmployee) {
      setResponseMessage("Please select an employee to add to the department.");
      return;
    }

    const data = {
      departmentID,
    };

    try {
      // TODO Change to web server here

      const response = await fetch(
        `https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/employees/${selectedEmployee}/switch/department/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to add employee to department:", error);
      setResponseMessage(
        "An error occurred while adding the employee to the department."
      );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Edit Department</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="departmentName"
            className="block text-sm font-medium text-gray-700"
          >
            Department Name:
          </label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="departmentID"
            className="block text-sm font-medium text-gray-700"
          >
            Department ID:
          </label>
          <input
            type="text"
            id="departmentID"
            value={departmentID}
            readOnly
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="managerID"
            className="block text-sm font-medium text-gray-700"
          >
            Manager ID:
          </label>
          <input
            type="text"
            id="managerID"
            value={managerID}
            onChange={(e) => setManagerID(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="managerFullName"
            className="block text-sm font-medium text-gray-700"
          >
            Manager Full Name:
          </label>
          <input
            type="text"
            id="managerFullName"
            value={managerFullName}
            readOnly
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={updateDepartment}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Department
        </button>
        <button
          onClick={deleteDepartment}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Department
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Employees that are not part of the department
      </p>
      <select
        id="selectedEmployee"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select an employee</option>
        {employeesNotInDepartment.map((employee) => (
          <option
            key={employee._id}
            value={employee._id}
          >{`${employee.firstName} ${employee.lastName} (id: ${employee._id})`}</option>
        ))}
      </select>
      <button
        onClick={addEmployeeToDepartment}
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add Employee
      </button>
      <p id="responseFromServer" className="mt-4 text-sm text-gray-600">
        {responseMessage}
      </p>
    </div>
  );
};

export default DepartmentsEditPage;
