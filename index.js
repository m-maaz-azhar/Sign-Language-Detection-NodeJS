const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { ImageToText } = require("./controller/ImageToVoice.controller");
const { SpeechToText } = require("./controller/SpeechToText.controller");

const app = express();

app.use(bodyParser.json());

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

app.listen(5000, () => console.log("SERVER IS RUNNING AT 5000"));

module.exports = app;