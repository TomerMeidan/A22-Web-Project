// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");
const mongoose = require("mongoose");

// Get all shifts that exist in the system
const getAllShifts = async () => {
  try {
    return await shiftModel.find().sort([["date", -1]]);
  } catch (err) {
    return err.message;
  }
};

// Add new shift to the system collection
const addShift = async (shiftData) => {
  // Parse string to Date
  const regex = /[-/]/;
  const dateParts = shiftData.date.split(regex);
  const jsDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

  shiftData.date = jsDate;
  const result = await shiftModel.find(shiftData);
  if (result.length > 0) return "This shift already exists in the system!";

  try {
    const shift = new shiftModel(shiftData);
    await shift.save();
  } catch (err) {
    console.log(
      `ShiftBLL: addShift: Failed Adding new shift! errMessage:${err.message}`
    );
    return `Failed adding new shift!`;
  }
  console.log("ShiftBLL: addShift: New shift inserted!");
  return "New shift inserted!";
};

// Edit an existing shift from the system collection
const editShift = async (shiftID, shiftData) => {
  await shiftModel
    .findOneAndUpdate({ _id: shiftID }, shiftData)
    .then(() => {
      console.log(
        `ShiftBLL: editShift: Shift (id: ${shiftID}) information was updated in the system`
      );
      return `Shift (id: ${shiftID}) information was updated in the system`;
    })
    .catch((err) => {
      console.log(
        `ShiftBLL: editShift: Error updating shift's (id: ${id}) information in the system! errorMEssage:${err.message}`
      );
      return `Updated shift's (id: ${id}) information in the system! ${err}`;
    });
};

const getShiftByID = async (shiftID) => {
  try {
    return await shiftModel.findOne({ _id: shiftID });
  } catch (err) {
    return err.message;
  }
};

module.exports = { getAllShifts, addShift, editShift, getShiftByID };
