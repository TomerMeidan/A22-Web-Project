const express = require("express");
const session = require("express-session");
const app = express();
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')


// Middleware : isAuth middleware verifies and clears only logged-in users
const isAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = await userModel.findOne({ id }).select("id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = isAuth;
