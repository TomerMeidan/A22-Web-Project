// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import EmployeesPage from "./pages/employees/EmployeesPage";
import NewEmployeePage from "./pages/employees/NewEmployeePage";
import EditEmployeePage from "./pages/employees/EditEmployeePage";
import UsersPage from "./pages/UsersPage";
import ShiftsPage from "./pages/shifts/ShiftsPage";
import NewShiftPage from "./pages/shifts/NewShiftPage";
import EditShiftPage from "./pages/shifts/EditShiftPage";
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import DepartmentsEditPage from "./pages/departments/DepartmentsEditPage";
import DepartmentsNewPage from "./pages/departments/DepartmentsNewPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";
import { Tab } from '@headlessui/react';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext'; // Import the DarkModeProvider and useDarkMode hook

function App() {
 const navigate = useNavigate();
 const { logout } = useLogout();
 const { user } = useAuthContext();
 const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the dark mode state and toggle function

 const handleClick = () => {
    logout();
 };

 // Dynamically set dark mode class on the body
 useEffect(() => {
   document.body.classList.toggle('dark', isDarkMode);
 }, [isDarkMode]);

 return (
    <>
      <header className={`bg-blue-500 text-white py-6 px-4 shadow-md ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">Factory Management Site</h1>
          <h3 id="user-name" className="text-xl">{`Welcome, ${user?.name}`}</h3>
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <Tab.Group selectedIndex={0} onChange={() => {}} className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
 <Tab.List className="flex p-1 space-x-1">
    <Tab className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} onClick={() => navigate("/welcome")}>Homepage</Tab>
    <Tab className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} onClick={() => navigate("/employees")}>Employees</Tab>
    <Tab className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} onClick={() => navigate("/departments")}>Departments</Tab>
    <Tab className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} onClick={() => navigate("/shifts")}>Shifts</Tab>
    <Tab className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} onClick={() => navigate("/users")}>Users</Tab>
    <Tab className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`} onClick={handleClick}>Logout</Tab>
 </Tab.List>
</Tab.Group>

      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/welcome"
            element={user ? <WelcomePage /> : <LoginPage />}
          />
          <Route
            path="/employees"
            element={user ? <EmployeesPage /> : <LoginPage />}
          />
          <Route
            path="/new-employee"
            element={user ? <NewEmployeePage /> : <LoginPage />}
          />
          <Route
            path="/edit-employee"
            element={user ? <EditEmployeePage /> : <LoginPage />}
          />
          <Route
            path="/departments"
            element={user ? <DepartmentsPage /> : <LoginPage />}
          />
          <Route
            path="/edit-department"
            element={user ? <DepartmentsEditPage /> : <LoginPage />}
          />
          <Route
            path="/new-department"
            element={user ? <DepartmentsNewPage /> : <LoginPage />}
          />
          <Route path="/shifts" element={user ? <ShiftsPage /> : <LoginPage />} />
          <Route
            path="/new-shift"
            element={user ? <NewShiftPage /> : <LoginPage />}
          />
          <Route
            path="/edit-shift"
            element={user ? <EditShiftPage /> : <LoginPage />}
          />
          <Route path="/users" element={user ? <UsersPage /> : <LoginPage />} />
        </Routes>
      </main>
    </>
 );
}

export default () => (
 <DarkModeProvider>
    <App />
 </DarkModeProvider>
);
