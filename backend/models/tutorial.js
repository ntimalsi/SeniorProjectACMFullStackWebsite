const { mongo } = require('mongoose');
const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    topic: { type: String, required: true },
    subject: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    ytLink : { type : String , required : true},
    date: String
  });

  
tutorialSchema.index(
    { topic: "text", subject: "text" },
    { weights: { topic: 5, subject: 3 } }
  );
  
  tutorialSchema.statics = {
    searchPartial: function(q, callback) {
      return this.find(
        {
          $or: [{ topic: new RegExp(q, "gi") }, { subject: new RegExp(q, "gi") }]
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
  
  module.exports = mongoose.model("Tutorial", tutorialSchema);
  