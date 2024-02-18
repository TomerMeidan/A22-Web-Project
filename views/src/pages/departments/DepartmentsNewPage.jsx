import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const DepartmentsNewPage = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { user } = useAuthContext();

  const saveDepartment = async () => {
    const data = {
      name: departmentName,
    };

    try {
      // TODO Change to web server here
      const response = await fetch("http://localhost:3000/departments/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const message = await response.json();
      setResponseMessage(message);
    } catch (error) {
      console.error("Failed to save department:", error);
      setResponseMessage("An error occurred while saving the department.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <br/>
      <h2 className="text-2xl font-bold mb-4">New Department</h2>
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
      </form>
      <div className="mt-4">
        <button
          onClick={saveDepartment}
          className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save
        </button>
        <button
          onClick={() => (window.location.href = "./departments")}
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

export default DepartmentsNewPage;
