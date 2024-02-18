const usersDAL = require("../DAL/web-service/usersDAL");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const checkUserCredentials = async (username, email) => {
  // WEB API CHECK
  const users = await usersDAL.getAllUsers();
  const user = users.find(
    (user) => user.username === username && user.email === email
  );
  if (user === undefined) return false;

  // DATABASE CHECK
  const userActions = await userModel.findOne({ id: user.id });
  if (userActions === undefined) return false;
  user["numOfActions"] = userActions.numOfActions;
  user["currentActions"] = userActions.currentActions;

  // CREATE A TOKEN
  user["token"] = createToken(user.id);
  return user;
};

module.exports = { checkUserCredentials };
