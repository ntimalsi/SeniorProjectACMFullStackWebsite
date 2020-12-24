const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  description: String,
  dateFrom: String,
  dateTo: String,
  time: String,
  filesId: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model("Event", eventSchema);
