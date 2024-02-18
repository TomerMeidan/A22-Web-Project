import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const EmployeesPage = () => {
  const [users, setUsers] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // TODO Fix Some Shifts are still displayed even though not part of employee

  useEffect(() => {
    const getAllUsersHandler = async () => {
      try {
        const response = await fetch("https://f706-2a00-a041-21c7-b000-a162-792c-effc-ff83.ngrok-free.app/employees", {
          headers: { Authorization: `Bearer ${user.token}` },
          method: "GET",
        });
        const usersData = await response.json();
        setUsers(usersData);
        const departments = buildDepartmentsList(usersData);
        setDepartmentsList(departments);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (user) getAllUsersHandler();
  }, []);

  const buildDepartmentsList = (usersData) => {
    const departmentsSet = new Set(
      usersData.map((user) => user.departmentID.name)
    );
    return Array.from(departmentsSet);
  };

  const filteredUsers =
    selectedDepartment === "all"
      ? users
      : users.filter((user) => user.departmentID.name === selectedDepartment);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <>
      <br />
      <label htmlFor="departments" className="block text-sm font-medium text-gray-700">
        Filter employees by department:
      </label>
      <select
        name="departments"
        id="departments"
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="all">All</option>
        {departmentsList.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <br/>
      <button
        onClick={() => navigate("/new-employee")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
      >
        Add New Employee
      </button>
      <br />
      <br />
      <table id="users-table" className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shifts
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user._id} id={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href="#"
                  onClick={() => {
                    sessionStorage.setItem("editEmployeeID", user._id);
                    navigate("/edit-employee");
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  {user.firstName} {user.lastName}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  {user.departmentID?.name}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-normal">
                {user.shifts.map((shift) => (
                  <div key={shift._id} className="mb-1">
                    <span className="font-medium text-indigo-600">Date:</span> {shift.date} | <span className="font-medium text-indigo-600">Starting Hour:</span> {shift.startingHour} | <span className="font-medium text-indigo-600">Ending Hour:</span> {shift.endingHour}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeesPage;
