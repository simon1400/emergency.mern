const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

const questionsRoutes = require("./routes/admin");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/dotaznik",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/admin/tests", questionsRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
