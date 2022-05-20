require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();

const shortUrlRouter = require("./routes/shortUrlRouter");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api/shorturl/", shortUrlRouter);

// listening request only after connection to DB was created
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});