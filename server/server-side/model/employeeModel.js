const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Employee Schema

const employeeSchema = new schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    shifts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shift",
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("employee", employeeSchema, "employees");
