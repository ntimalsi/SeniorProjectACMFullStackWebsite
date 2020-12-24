const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Event = require("../models/event");
const Faculty = require("../models/faculty");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");

const dbURI =
  "mongodb+srv://nischal123:nischal123@acmcluster.rqphq.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

const conn = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let gfs;

conn.once("open", () => {
  //initialize the stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

const storage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "event"
      };
      resolve(fileInfo);
    });
  }
});

const router = express.Router();

router.post(
  "/create",
  checkAuth,
  multer({ storage: storage }).array("files[]", 5),
  (req, res, next) => {
    console.log("here 1");
    console.log("date from " + req.body.dateFrom);
    console.log("date to  " + req.body.dateTo);
    const event = new Event({
      creator: req.userData.userId,
      time: req.body.time,
      title: req.body.title,
      description: req.body.description,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo
    });
    if (req.files) {
      const files = res.req.files;
      files.forEach(file => {
        event.filesId.push(file.id);
      });
    }
    event.save().then(newEvent => {
      console.log(newEvent);
      res.status(201).json({ ...newEvent.toObject(), id: newEvent._id });
    });
  }
);

router.get("", (req, res, next) => {
  var docs = [];
  let docslength;
  Event.find().then(documents => {
    docslength = documents.length;
    documents.map(event => {
      Faculty.findById({ _id: event.creator }).then(user => {
        user1 = {
          username: user.name,
          branch: user.branch
        };
        user1 = Object.assign(user1, event.toObject());
        docs.push(user1);
        console.log(docs.length);
        if (docs.length === docslength) {
          console.log("Events response sent");
          res.json({
            events: docs
          });
        }
      });
    });
  });
});

router.get("/announceFiles", async (req, res, next) => {
  const ids = req.body.ids;
  console.log(ids);
  for (let i = 0; i < ids.length; i++) {
    gfs
      .collection("announce.files")
      .findById({ _id: ids[i] })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          console.log("file error");
          return res.status(404).json({
            message: "error"
          });
        }

        var readstream = gfs.createReadStream({
          filename: files[0].filename,
          root: "announce"
        });

        res.set("Content-Type", files[0].contentType);
      });
  }
  return readstream.pipe(res);
});

module.exports = router;
