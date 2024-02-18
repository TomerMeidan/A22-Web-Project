// This is the main entry point of the Factory Management backend
// Author: Tomer Meidan
// 1st version date: 19.10.2023 13:39

// TODO Improve the actions to database logic (right now it updates when user logs out)

// NPM Library Imports
require("./utils/logger");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const isAuth = require("./utils/auth");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const db = require("./configs/db");
const loginRouter = require("./routers/loginRouter");
const employeesRouter = require("./routers/employeesRouter");
const shiftsRouter = require("./routers/shiftsRouter");
const departmentsRouter = require("./routers/departmentsRouter");
const usersRouter = require("./routers/usersRouter");
const app = express();
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@dbcluster.knsvsbs.mongodb.net/factory-users?retryWrites=true&w=majority`;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
const dirname = __dirname.replace("server-side", "views");
app.set("views", dirname);

// Global server variables
const PORT = process.env.PORT || 3000;

// Get Current Time
// const midnightTime = () => {
//   const midnightTime = new Date();
//   midnightTime.setHours(24);
//   midnightTime.setMinutes(0);
//   midnightTime.setSeconds(0);

//   return midnightTime.getTime() - new Date().getTime();
// };

// Database Connection
db.connectDB(uri);

// Session collection storage on mongoDB
// const sessionStorage = new MongoDBSession({
//   uri: uri,
//   collection: "mySessions",
// });

// Middlewares Section
// Default Middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(express.json());
app.use(cors());

// Sessions Middleware
// app.use(
//   session({
//     secret: "chocolate rain",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStorage,
//     cookie: {
//       maxAge: midnightTime(), // Set the cookie expiration to midnight
//     },
//   })
// );

// Routers Section
// Login router page related requests
app.use("/login", loginRouter);

// TODO Fix the auth system
app.use(isAuth);

// Employees router page related requests
app.use("/employees", employeesRouter);

// Departments router page related requests
app.use("/departments", departmentsRouter);

// Shifts router page related requests
app.use("/shifts", shiftsRouter);

// Users router page related requests
app.use("/users", usersRouter);

// Server Connection
app.listen(PORT, () => {
  console.log(
    `Factory Management Server is listening on http://localhost:${PORT}`
  );
});
