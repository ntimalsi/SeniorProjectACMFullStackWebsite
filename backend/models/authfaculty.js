const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const authFacultySchema = new mongoose.Schema({
  employeeId: { type: String, unique: true }
});

authFacultySchema.plugin(uniqueValidator);
module.exports = mongoose.model("AuthFaculty", authFacultySchema);
