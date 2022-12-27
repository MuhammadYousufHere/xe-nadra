const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URI;
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
mongoose.set("strictQuery", false);
module.exports = connectMongoBD;
