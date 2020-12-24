const mongoose = require("mongoose");

const papersSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  exam: { type: String, required: true },
  subjects: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  filename: { type: String, required: true },
  sessionFrom : { type : String, required : true},
  sessionTo : { type : String, required : true},
  date: String
});

papersSchema.index(
  { semester: "text", subjects: "text" },
  { weights: { semester: 3, subject: 3 } }
);

papersSchema.statics = {
  searchPartial: function(q, callback) {
    return this.find(
      {
        $or: [{ semester: new RegExp(q, "gi") }, { subject: new RegExp(q, "gi") }]
      },
      callback
    );
  },

  searchFull: function(q, callback) {
    return this.find(
      {
        $text: { $search: q, $caseSensitive: false }
      },
      callback
    );
  },

  search: function(q, callback) {
    this.searchFull(q, (err, data) => {
      if (err) return callback(err, data);
      if (!err && data.length) return callback(err, data);
      if (!err && data.length === 0) return this.searchPartial(q, callback);
    });
  }
};

module.exports = mongoose.model("Papers", papersSchema);
