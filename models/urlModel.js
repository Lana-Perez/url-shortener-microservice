const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
    unique: true,
  },
  short_url: {
    type: Number,
    required: true,
    //index: true,
    unique: true,
  },
});
module.exports = mongoose.model("Url", urlSchema);
