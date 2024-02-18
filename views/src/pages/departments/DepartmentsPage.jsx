import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const DepartmentsMainPage = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllDepartmentsHandler = async () => {
      try {
        // TODO Change to live server
        const response = await fetch("https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/departments", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            method: "GET",
          },
        });
        const departments = await response.json();
        setDepartmentsData(departments);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    if (user) getAllDepartmentsHandler();
  }, []);
  const buildDepartmentsTable = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Manager
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Employees
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departmentsData.map((department) => (
            <tr
              key={department._id}
              id={department._id}
              className="cursor-pointer"
              onClick={() => {
                sessionStorage.setItem("editDepartmentID", department._id);
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to="/edit-department"
                  className="text-blue-600 hover:underline"
                >
                  {department.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {department.manager[0]?.firstName}{" "}
                {department.manager[0]?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {department.employees.map((employee) => (
                  <div
                    key={employee?._id}
                    id={employee?._id}
                    className="cursor-pointer"
                    onClick={() => {
                      sessionStorage.setItem("editEmployeeID", employee._id);
                    }}
                  >
                    <Link
                      to="/edit-employee"
                      className="text-blue-600 hover:underline"
                    >
                      {employee?.firstName} {employee?.lastName}
                    </Link>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <br/>
      <button
        onClick={() => navigate("/new-department")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
      >
        Add New Department
      </button><br/>
      <br/>
      {buildDepartmentsTable()}
    </div>
  );
};

export default DepartmentsMainPage;
