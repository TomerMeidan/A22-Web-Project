const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Shift Schema

const shiftSchema = new schema({
  date: String,
  startingHour: Number,
  endingHour: Number,
},{ versionKey: false });

module.exports = mongoose.model("shift", shiftSchema, "shifts");
