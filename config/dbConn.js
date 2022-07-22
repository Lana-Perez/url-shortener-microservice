require("dotenv").config();
const mongoose = require("mongoose");
const dbUri = process.env.DATABASE_URI || "mongodb+srv://user:123test@cluster0.xsx34.mongodb.net/URLShortener?retryWrites=true&w=majority"
//mongoose.set("debug", true);
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);

  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;
