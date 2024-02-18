const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Department Schema

const departmentSchema = new schema({
  name: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
});

module.exports = mongoose.model("department", departmentSchema, "departments")
