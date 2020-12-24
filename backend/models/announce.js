const mongoose = require("mongoose");

const announceSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  description: String,
  time: String,
  filesId: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model("Announcement", announceSchema);
