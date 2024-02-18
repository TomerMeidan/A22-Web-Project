const express = require("express");
const session = require("express-session");
const app = express();

// Middleware : checkActions middleware checks action value for user and updates the database
const checkActions = (req, res, next) => {
  if (req.session.isAuth && req.session.currentActions > 0) { // Still has some actions left
    req.session.currentActions--;

    const user = {
      id: req.session.user.id,
      maxActions: req.session.maxActions,
      actionsAllowed: req.session.currentActions
    }
    console.update(user);
    
    next();
  } else {
    res.redirect("/users/logout"); // Has now 0 actions left
  }
};

module.exports = checkActions;
