const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  name: String,
  surname: String,
  rodneCislo: String,
  password: String,
  typeUser: String,
  parrentDoctor: String,
  selectTest: [String]
});

module.exports = mongoose.model("User", User);
