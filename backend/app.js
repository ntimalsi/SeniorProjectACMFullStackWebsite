const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const announceRouter = require("./routes/announce");
const eventRouter = require("./routes/event");
const notesRouter = require("./routes/notes");
const booksRouter = require("./routes/books");
const tutorialRouter = require('./routes/tutorials');
const papersRouter = require('./routes/papers');

mongoose
  .connect(
    "mongodb+srv://nischal123:nischal123@acmcluster.rqphq.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const app = express();

//some necessary routes to parse response and solving CORS error
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join("backend/images")));
app.use("/announceFiles", express.static(path.join("backend/announceFiles")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//User defined paths goes here

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.use("/api/announce", announceRouter);
app.use("/api/event", eventRouter);
app.use("/api/notes", notesRouter);
app.use("/api/books", booksRouter);
app.use('/api/tutorials', tutorialRouter);
app.use('/api/papers', papersRouter);

module.exports = app;
