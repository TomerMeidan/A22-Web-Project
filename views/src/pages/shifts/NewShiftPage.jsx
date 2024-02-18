import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const NewShiftPage = () => {
  const [startingHour, setStartingHour] = useState("0");
  const [endingHour, setEndingHour] = useState("0");
  const [startingDate, setStartingDate] = useState("1994-12-20");
  const [responseMessage, setResponseMessage] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate()
  const hoursAreValid = (start, end) => {
    const startingHour = parseInt(start);
    const endingHour = parseInt(end);

    return (
      startingHour >= 0 &&
      startingHour <= 23 &&
      endingHour >= 0 &&
      endingHour <= 23 &&
      startingHour < endingHour
    );
  };

  const dateIsValid = (dateString) => {
    const regex = /^(\d{4})[-/](\d{2})[-/](\d{2})$/;
    const match = dateString.match(regex);
    if (!match) return false;

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    return day >= 1 && day <= 31 && month >= 1 && month <= 12;
  };

  const saveShift = async () => {
    if (!hoursAreValid(startingHour, endingHour)) {
      setResponseMessage("Hours format isn't valid!");
      return;
    }

    if (!dateIsValid(startingDate)) {
      setResponseMessage("Date format isn't valid!");
      return;
    }

    const dateData = {
      date: startingDate,
      startingHour,
      endingHour,
    };
    try {
      // TODO Change to web server
      const response = await fetch("https://a22-web-project.onrender.com/shifts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(dateData),
      });
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to save shift:", error);
      setResponseMessage("An error occurred while saving the shift.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <br/>
      <h2 className="text-2xl font-bold mb-4">New Shift</h2>
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
        <div>
          <label
            htmlFor="startingDate"
            className="block text-sm font-medium text-gray-700"
          >
            Shift Starting Date:
          </label>
          <input
            type="text"
            id="startingDate"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={saveShift}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save
        </button>
        <button
          onClick={() => (navigate("/shifts"))}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
      <p id="responseFromServer" className="mt-4 text-sm text-gray-600">
        {responseMessage}
      </p>
    </div>
  );
};

export default NewShiftPage;
