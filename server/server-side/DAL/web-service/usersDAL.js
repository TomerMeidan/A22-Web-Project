const axios = require("axios");
const usersUrl = "https://jsonplaceholder.typicode.com/users";

// Get All Users
const getAllUsers = async () => {
  const {data: response} = await axios.get(usersUrl);
  return response;
};

module.exports = { getAllUsers };
