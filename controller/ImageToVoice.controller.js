const ReadText = require("text-from-image");
const gTTS = require("gtts");
const moment = require("moment");
const { bucket } = require("./Firebase.controller");

const ImageToText = (imgBase64) => {
  return new Promise(async function (resolve, reject) {
    try {
      const text = await ReadText(imgBase64);
      const gtts = new gTTS(text, "en");
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
    } catch (e) {
      reject({ success: false, error: e });
    }
  });
};
module.exports = { ImageToText };
