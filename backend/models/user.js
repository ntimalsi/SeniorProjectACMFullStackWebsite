const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: { type: String },
  branch: { type: String },
  batchFrom: { type: Date },
  batchTo: { type: Date },
  enrolNo: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  mobile: { type: Number, unique: true },
  designation: { type: String },
  profilepicPath: { type: String }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
