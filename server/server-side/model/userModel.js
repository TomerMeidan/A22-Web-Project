const mongoose = require("mongoose");

const schema = mongoose.Schema;

// User Schema

const userSchema = new schema(
  {
    id: { type: Number, unique: true },
    name: { type: String },
    numOfActions: {type: Number},
    currentActions: {type: Number},
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema, "users");
