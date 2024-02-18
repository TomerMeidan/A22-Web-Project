import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllUsersHandler = async () => {
      try {
        const response = await fetch("https://a22-web-project.onrender.com/users", {
          headers: { Authorization: `Bearer ${user.token}` },
          method: "GET",
        });
        const users = await response.json();
        setUsersData(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (user) getAllUsersHandler();
  }, []);

  const buildUsersTable = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Max Actions Allowed
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Current Actions Allowed
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersData.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.numOfActions}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.currentActions}
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
      {buildUsersTable()}
    </div>
  );
};

export default UsersPage;
