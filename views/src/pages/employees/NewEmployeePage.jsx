import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const NewEmployeePage = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    startWorkYear: "",
    departmentName: "",
  });
  const [shifts, setShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    const addNewEmployeeOnLoadHandler = async () => {
      try {
        const allShifts = await getAllShifts();
        setShifts(allShifts);
      } catch (error) {
        console.error("Failed to fetch shifts:", error);
      }
    };

    if (user) addNewEmployeeOnLoadHandler();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleShiftSelection = (shiftId) => {
    setSelectedShifts((prevState) => {
      const exists = prevState.includes(shiftId);
      if (exists) {
        return prevState.filter((id) => id !== shiftId);
      } else {
        return [...prevState, shiftId];
      }
    });
  };

  const addEmployee = async () => {
    try {
      const response = await fetch("https://a22-web-project.onrender.com/employees/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...employee, shifts: selectedShifts }),
      });
      const responseMessage = await response.json();
      alert(JSON.stringify(responseMessage));
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const getAllShifts = async () => {
    try {
      const response = await fetch("https://a22-web-project.onrender.com/shifts", {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const shiftsData = await response.json();
      return shiftsData;
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form className="space-y-4">
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
            value={employee.firstName}
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
            value={employee.lastName}
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
            type="number"
            id="startWorkYear"
            name="startWorkYear"
            value={employee.startWorkYear}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
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
            name="departmentName"
            value={employee.departmentName}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>

      <p className="mb-2">Shifts Database</p>
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
          {shifts.map((shift) => (
            <tr
              key={shift._id}
              id={shift._id}
              className={`cursor-pointer ${
                selectedShifts.includes(shift._id) ? "bg-yellow-200" : ""
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
          onClick={addEmployee}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add
        </button>
        <button
          onClick={() => (navigate("/employees"))}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>

      <p id="responseFromServer" className="mt-4"></p>
    </div>
  );
};

export default NewEmployeePage;
