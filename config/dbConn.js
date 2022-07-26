require("dotenv").config();
const mongoose = require("mongoose");
const dbUri = process.env.DATABASE_URI;
//mongoose.set("debug", true);
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);

  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;
