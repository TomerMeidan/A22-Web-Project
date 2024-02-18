const WelcomePage = () => {
  return (
    <>
    <br/><br/><br/>
      <div style={{ fontSize: "20px" }}>
        <p>
          Welcome to the Factory Management Site! We provide a comprehensive
          platform to help you easily:
        </p>
        <br/>
        <ul style={{ textAlign: "left" }}>
          <li>
            <b>Log In Securely:</b> Our login uses secure authentication to keep
            your data safe. Once logged in, you'll see your name on every page.
          </li>
          <li>
            <b>Manage Employees:</b> View all employees in a sortable table.
            Easily edit employee details, delete employees, and add new ones.
          </li>
          <li>
            <b>Organize Departments:</b> See all departments and who works in
            each one. Create new departments and assign employees.
          </li>
          <li>
            <b>Schedule Shifts:</b> Schedule shifts for employees and assign
            them to shifts. Easily create and modify shifts.
          </li>
          <li>
            <b>Stay Within Limits:</b> We limit actions per user per day to
            ensure smooth operations. You'll be logged out when your daily
            actions are used.
          </li>
          <li>
            <b>View Users:</b> See details on all registered users and the
            actions they have remaining. Our intuitive interface makes it simple
            to handle all your employee management needs
          </li>
        </ul>
      </div>
    </>
  );
};

export default WelcomePage;
