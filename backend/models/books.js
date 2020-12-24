const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: String
});

booksSchema.index(
  { title: "text", author: "text" },
  { weights: { title: 5, author: 3 } }
);

booksSchema.statics = {
  searchPartial: function(q, callback) {
    return this.find(
      {
        $or: [{ title: new RegExp(q, "gi") }, { author: new RegExp(q, "gi") }]
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

module.exports = mongoose.model("Books", booksSchema);
