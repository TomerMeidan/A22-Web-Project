import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const EditEmployeePage = () => {
  const [employee, setEmployee] = useState({});
  const [shifts, setShifts] = useState([]);
  const [allShifts, setAllShifts] = useState([]);
  const [newShiftsForEmployee, setNewShiftsForEmployee] = useState({
    shifts: [],
  });
  const { user } = useAuthContext();

  useEffect(() => {
    const editEmployeeHandler = async () => {
      try {
        const id = sessionStorage.getItem("editEmployeeID");
        const response = await fetch(
          `http://localhost:3000/employees/edit/${id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const user2 = await response.json();
        setEmployee(user2);
        setNewShiftsForEmployee({
          shifts: user2.shifts.map((shift) => shift._id),
        });

        const allShiftsResponse = await fetch("http://localhost:3000/shifts", {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const allShiftsData = await allShiftsResponse.json();
        setAllShifts(allShiftsData);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    if (user) editEmployeeHandler();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleShiftSelection = (shiftId) => {
    setNewShiftsForEmployee((prevState) => {
      const exists = prevState.shifts.includes(shiftId);
      if (exists) {
        return { shifts: prevState.shifts.filter((id) => id !== shiftId) };
      } else {
        return { shifts: [...prevState.shifts, shiftId] };
      }
    });
  };

  const updateEmployee = async () => {
    try {
      const id = sessionStorage.getItem("editEmployeeID");
      const response = await fetch(
        `http://localhost:3000/employees/edit/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employee,
            shifts: newShiftsForEmployee.shifts,
          }),
        }
      );
      const result = await response.json();
      alert(JSON.stringify(result));
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  const deleteEmployee = async () => {
    try {
      const id = sessionStorage.getItem("editEmployeeID");
      const response = await fetch(
        `http://localhost:3000/employees/edit/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` }, method: "DELETE" }
      );
      const result = await response.json();
      alert(JSON.stringify(result));
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="employeeID"
            className="block text-sm font-medium text-gray-700"
          >
            ID:
          </label>
          <input
            type="text"
            id="employeeID"
            value={employee._id || ""}
            readOnly
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={employee.firstName || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employee.lastName || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="startWorkYear"
            className="block text-sm font-medium text-gray-700"
          >
            Start Work Year:
          </label>
          <input
            type="text"
            id="startWorkYear"
            name="startWorkYear"
            value={employee.startWorkYear || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department Name:
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.departmentID?.name || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <br/>

      <p className="mb-2">Entire Shifts Database</p>
      <table
        id="all-shifts-table"
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Starting Hour
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ending Hour
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allShifts.map((shift) => (
            <tr
              key={shift._id}
              id={shift._id}
              className={`cursor-pointer ${
                newShiftsForEmployee.shifts.includes(shift._id)
                  ? "bg-yellow-200"
                  : ""
              }`}
              onClick={() => handleShiftSelection(shift._id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{shift.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {shift.startingHour}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {shift.endingHour}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={updateEmployee}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Update
        </button>
        <button
          onClick={deleteEmployee}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>

      <p id="responseFromServer" className="mt-4"></p>
    </>
  );
};

export default EditEmployeePage;
