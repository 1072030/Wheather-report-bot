const serviceAccount = require("./weather-line-bot-1-firebase-adminsdk-0byt9-5ebcd9f602.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
module.exports = firestore;
