import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const ShiftsPage = () => {
  const [shiftsData, setShiftsData] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllShiftsHandler = async () => {
      try {
        // TODO Change to web server
        const response = await fetch("http://localhost:3000/shifts", {
          headers: { Authorization: `Bearer ${user.token}` },
          method: "GET",
        });
        const shifts = await response.json();
        setShiftsData(shifts);
      } catch (error) {
        console.error("Failed to fetch shifts:", error);
      }
    };

    if (user) getAllShiftsHandler();
  }, []);


  return (
    <div className="container mx-auto px-4">
      <br/>
      <button
        onClick={() => navigate("/new-shift")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
      >
        Add New Shift
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Shift ID
            </th>
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
          {shiftsData.map((shift) => (
            <tr
              key={shift._id}
              id={shift._id}
              className="cursor-pointer"
              onClick={() => {
                sessionStorage.setItem("editShiftID", shift._id);
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to="/edit-shift"
                  className="text-blue-600 hover:underline"
                >
                  {shift._id}
                </Link>
              </td>
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
    </div>
  );
};

export default ShiftsPage;
