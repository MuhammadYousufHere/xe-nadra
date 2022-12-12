const mongoose = require("mongoose"),
  config = require("config"),
  db = config.get("mongoURI");

// using async/await (new standard)

const connectMongoBD = async () => {
  try {
    await mongoose.connect(db, {
      useNewURLParser: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error.message);
    // exit the process with failure
    process.exit(1);
  }
};

module.exports = connectMongoBD;
