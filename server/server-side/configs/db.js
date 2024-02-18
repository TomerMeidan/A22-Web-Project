const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database is connected to ${connectionString}`);
  } catch (err) {
    console.log(`DATABASE CONNECTION ERROR: Message: ${err}`);
  }
};

module.exports = { connectDB };
