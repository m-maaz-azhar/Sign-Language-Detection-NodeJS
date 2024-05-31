const { Deepgram } = require("@deepgram/sdk");
const fs = require("fs");

const deepgramApiKey = "";

const SpeechToText = (pathToFile) => {
  return new Promise(async function (resolve, reject) {
    try {
      // Initializes the Deepgram SDK
      const deepgram = new Deepgram(deepgramApiKey);

      const mimetype = "audio/mp4";

      deepgram.transcription
        .preRecorded(
          { buffer: fs.readFileSync(pathToFile), mimetype },
          { punctuate: true, language: "en-US" }
        )
        .then((transcription) => {
          resolve({
            success: true,
            text: transcription?.results?.channels[0]?.alternatives[0]
              ?.transcript,
          });
        })
        .catch((err) => {
          console.log(err);
          reject({ success: false, error: err });
        });
    } catch (e) {
      reject({ success: false, error: e });
    }
  });
};

module.exports = { SpeechToText };
