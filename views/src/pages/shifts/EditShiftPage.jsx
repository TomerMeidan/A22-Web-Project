import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const EditShiftPage = () => {
  const [shiftID, setShiftID] = useState("");
  const [date, setDate] = useState("");
  const [startingHour, setStartingHour] = useState("");
  const [endingHour, setEndingHour] = useState("");
  const [employeesNotInShift, setEmployeesNotInShift] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const id = sessionStorage.getItem("editShiftID");
      loadSelectedShift(id);
      buildNoneShiftEmployeesList(id);
    }
  }, []);

  const loadSelectedShift = async (id) => {
    // TODO Change to web server
    const response = await fetch(`https://a22-web-project.onrender.com/shifts/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
      method: "GET",
    });
    const shift = await response.json();

    setShiftID(shift._id);
    setDate(shift.date);
    setStartingHour(shift.startingHour);
    setEndingHour(shift.endingHour);
  };

  const buildNoneShiftEmployeesList = async (id) => {
    // TODO Change to web server
    const response = await fetch(
      `https://a22-web-project.onrender.com/employees/not_in/shift/${id}`,
      { headers: { Authorization: `Bearer ${user.token}` }, method: "GET" }
    );
    const employees = await response.json();

    setEmployeesNotInShift(employees);
  };

  const updateShift = async () => {
    const data = {
      date,
      startingHour,
      endingHour,
    };

    try {
      // TODO Change to web server
      const response = await fetch(
        `https://a22-web-project.onrender.com/shifts/edit/${shiftID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to update shift:", error);
      setResponseMessage("An error occurred while updating the shift.");
    }
  };

  const addEmployeeToShift = async () => {
    if (!selectedEmployee) {
      setResponseMessage("Please select an employee to add to the shift.");
      return;
    }

    const data = {
      shiftID,
    };

    try {
      // TODO Change to web server
      const response = await fetch(
        `https://a22-web-project.onrender.com/employees/${selectedEmployee}/switch/shift/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to add employee to shift:", error);
      setResponseMessage(
        "An error occurred while adding the employee to the shift."
      );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <br/>
      <h2 className="text-2xl font-bold mb-4">Edit Shift</h2>
      <p className="mb-4">
        <strong>Please Note:</strong>
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Date format: <strong>year-month-day</strong> or{" "}
          <strong>year/month/day</strong>
        </li>
        <li>
          Date format: All single digit months or days must have a leading 0
        </li>
        <li>
          Hour format: Only characters between <strong>0 - 23</strong>
        </li>
        <li>
          <strong>
            Make sure the date and hours values don`t exist together in the
            system already
          </strong>
        </li>
      </ul>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="shiftID"
            className="block text-sm font-medium text-gray-700"
          >
            Shift ID:
          </label>
          <input
            type="text"
            id="shiftID"
            value={shiftID}
            readOnly
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="startingHour"
            className="block text-sm font-medium text-gray-700"
          >
            Starting Hour:
          </label>
          <input
            type="text"
            id="startingHour"
            value={startingHour}
            onChange={(e) => setStartingHour(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="endingHour"
            className="block text-sm font-medium text-gray-700"
          >
            Ending Hour:
          </label>
          <input
            type="text"
            id="endingHour"
            value={endingHour}
            onChange={(e) => setEndingHour(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={updateShift}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Shift
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Employees that are not part of the shift
      </p>
      <select
        id="selectedEmployee"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select an employee</option>
        {employeesNotInShift.map((employee) => (
          <option
            key={employee._id}
            value={employee._id}
          >{`${employee.firstName} ${employee.lastName} (id: ${employee._id})`}</option>
        ))}
      </select>
      <button
        onClick={addEmployeeToShift}
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

export default EditShiftPage;
