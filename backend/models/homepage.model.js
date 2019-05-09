const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Homepage = new Schema({
  head: String,
  description: String,
});

module.exports = mongoose.model("Homepage", Homepage);
