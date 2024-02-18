// Imports
const express = require("express");
const loginBLL = require("../BLL/loginBLL");
const loginRouter = express.Router();

// Entry Point: localhost:PORT/login

loginRouter.post("/", async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await loginBLL.checkUserCredentials(username, email);
    if (!user) return res.json({ status: "No Auth" });
    console.log(
      `User id ${user.id} is now logged`
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = loginRouter;
