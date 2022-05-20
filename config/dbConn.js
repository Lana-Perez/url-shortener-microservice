require("dotenv").config();
const mongoose = require("mongoose");

//mongoose.set("debug", true);
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URI /*{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }*/
    );
  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;
