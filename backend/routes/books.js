const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Books = require("../models/books");
const User = require("../models/user");
const Faculty = require("../models/faculty");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const GridFsStream = require("gridfs-stream");

const router = express.Router();
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
    bucketName: "books"
  });
});

const storage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const filename = Date.now() + "_" + name;
      const fileInfo = {
        filename: filename,
        bucketName: "books"
      };
      console.log("filename " + filename);
      resolve(fileInfo);
    });
  }
});

router.post(
  "/create",
  checkAuth,
  multer({ storage: storage }).single("file"),
  (req, res, next) => {
    const book = new Books({
      creator: req.userData.userId,
      title: req.body.title,
      author: req.body.author,
      branch: req.body.branch,
      semester: req.body.semester,
      date: req.body.date
    });
    console.log(res.req.file);

    book.fileId = res.req.file.id;

    book.save().then(newBook => {
      console.log(newBook);
      res.status(201).json({ ...newBook.toObject(), id: newBook._id });
    });
  }
);

router.post("/getBook", (req, res, next) => {
  let filename = req.body.filename;
  console.log(filename);
  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file Exists"
      });
    }
    console.log("file found");
    const gridReadStream = gfs.createReadStream({
      filename: filename
    });
    gridReadStream.pipe(res);
    gridReadStream.on("data", function(data) {
      res.write(data);
    });
    gridReadStream.on("end", function() {
      res.status(200).end();
    });
  });
});

router.get("", (req, res, next) => {
  var docs = [];
  let docslength;
  Books.find().then(documents => {
    docslength = documents.length;
    documents.map(books => {
      User.findById({ _id: books.creator }).then(user => {
        if (user) {
          user1 = {
            username: user.name,
            designation: "Student",
            profileimg:
              "data:image/png;base64,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"
          };
          user1 = Object.assign(user1, books.toObject());
          docs.push(user1);
          console.log(docs.length);
          if (docs.length === docslength) {
            // console.log(docs);
            console.log("response sent");
            res.json({
              books: docs
            });
          }
        } else {
          Faculty.findById({ _id: books.creator }).then(faculty => {
            faculty = {
              username: faculty.name,
              designation: "Faculty"
            };
            faculty = Object.assign(faculty, books.toObject());
            docs.push(faculty);
            console.log(docs.length);
            if (docs.length === docslength) {
              // console.log(docs);
              console.log("response sent");
              res.json({
                books: docs
              });
            }
          });
        }
      });
    });
  });
});

router.post("/search", (req, res, next) => {
  console.log(req.body.search);
  Books.search(req.body.search, (findErr, findRes) => {
    if (findErr) {
      //log error here
      res.status(500).send({
        message: "Failed: to search via index",
        success: true,
        result: findErr
      });
    } else {
      res.send(findRes);
    }
  });
});

router.post("/filter", (req, res, next) => {
  let branch = req.body.branch;
  let sem = req.body.sem;
  console.log(req.body.branch);
  console.log(req.body.sem);
  if (branch.length && sem.length) {
    Books.find({
      $and: [
        { branch: { $in: req.body.branch } },
        { semester: { $in: req.body.sem } }
      ]
    }).then(resData => {
      console.log(resData);
      res.status(200).send(resData);
    });
  } else {
    Books.find({
      $or: [
        { branch: { $in: req.body.branch } },
        { semester: { $in: req.body.sem } }
      ]
    }).then(resData => {
      console.log(resData);
      res.status(200).send(resData);
    });
  }
});

router.delete("/:id", checkAuth, (req, res, next) => {
  console.log("bookid to delete " + req.params.id);
  Books.deleteOne({ _id: req.params.id }).then(book => {
    console.log("deleted in backend");
        res.status(201).json({ message: "book deleted" });
  });
});

module.exports = router;
