const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  iconName: { type: String, default: "info" }
});

module.exports = mongoose.model("CarFacility", schema);
