const admin = require("firebase-admin");
const serviceAccount = require("../config/deaf-and-dumb-7017a-272c5113cb4d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "",
});

const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
