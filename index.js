const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { ImageToText } = require("./controller/ImageToVoice.controller");
const { SpeechToText } = require("./controller/SpeechToText.controller");

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json({ message: "Running..." });
});

app.post("/image-to-voice", upload.single("fileData"), async (req, res) => {
  let result = await ImageToText(req.file.path);
  res.json({ result });
});

app.post("/speech-to-text", upload.single("fileData"), async (req, res) => {
  let result = await SpeechToText(req.file.path);
  res.json({ result });
});

app.listen(process.env.PORT || 80, () =>
  console.log("SERVER IS RUNNING AT 80")
);
