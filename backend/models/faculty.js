const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const facultySchema = new mongoose.Schema({
  name: { type: String },
  branch: { type: String },
  employeeId: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  mobile: { type: Number, unique: true },
  designation: { type: String },
  profilepicPath: { type: String }
});

facultySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Faculty", facultySchema);
