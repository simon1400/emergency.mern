const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Result = new Schema({
  idTest: String,
  nameTest: String,
  currentAsk: Number,
  answers: [Object],
  date: String,
  done: { type: Boolean, default: false },
  userId: String
});

module.exports = mongoose.model("Result", Result);
