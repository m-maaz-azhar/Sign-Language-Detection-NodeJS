const ReadText = require("text-from-image");
const fs = require("fs");
const tesseract = require("node-tesseract-ocr");
const gTTS = require("gtts");
const moment = require("moment");
const { bucket } = require("./Firebase.controller");

const ImageToText = (img) => {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };
  return new Promise(async function (resolve, reject) {
    tesseract
      .recognize(img, config)
      .then(() => {
        let file = fs.readFileSync(`${process.cwd()}/stdout.txt`);
        const gtts = new gTTS(file?.toString(), "en");
        gtts.save(`${process.cwd()}/audio/voice.mp3`, async function (err) {
          if (err) {
            reject({ success: false, error: err });
          }
          await bucket.upload(`${process.cwd()}/audio/voice.mp3`, {
            destination: "audio/voice.mp3",
          });
          let urls = await bucket.file("audio/voice.mp3").getSignedUrl({
            action: "read",
            expires: moment().add(1, "day").format("MM-DD-YYYY"),
          });
          resolve({ success: true, url: urls[0] });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};
module.exports = { ImageToText };
