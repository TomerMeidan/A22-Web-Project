## Factory Management Website

### Project Overview
The Factory Management Website is a comprehensive solution designed to streamline the operations of factory management. Built with Node.js and Express on the backend, ReactJS on the frontend, and MongoDB for data storage, this platform offers robust features for managing employees, departments, and shift schedules. It incorporates JWT authentication to ensure secure access for users.

### Key Features
- **Employee Management:** Create, view, update, and delete employee records.
- **Department Management:** Organize departments and assign employees.
- **Shift Scheduling:** Efficiently manage shift patterns and assignments.
- **Secure Authentication:** Utilize JWT for secure login and session management.

### Prerequisites
- Node.js
- MongoDB
- npm

### Additional Information

1. **Special Documents:** In the database, you will encounter two special documents: an employee named `DEFAULT USER` and a department called `NONE`. Please **do not delete, update, or change** these two documents under any circumstances.

2. **Server Inactivity Wait Time:** The server is hosted on Render, which imposes a 50-second penalty wait time for inactive servers. Therefore, you may need to wait approximately 1 minute before the page processes and you can proceed to the following page.

3. **Database Operations:** We have enabled read and write operations on Atlas and pre-populated it with some data. Again, it's crucial to avoid modifying the `DEFAULT USER` employee and the `NONE` department documents.

4. **Modifying Data:** You are free to add, edit, or delete any of the departments, employees, and shifts, with the exception of the `DEFAULT USER` and `NONE` documents mentioned above.

5. **Frontend Access:** The frontend of the application is accessible at [https://a22-web-project.vercel.app/](https://a22-web-project.vercel.app/).

6. **Running the Project Locally:** If you wish to access the project from within the IDE, follow these steps:
   - **Backend Setup:** Navigate to the server directory (`A22-Web-Project/server`) and execute `npm run dev` to start the backend.
   - **Frontend Setup:** For the frontend, move to the views directory (`A22-Web-Project/views`) and perform `npm run dev` as well to start the frontend.
