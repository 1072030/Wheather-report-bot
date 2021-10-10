const firestore = require("../config/firebaseConfig");
const confirm = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  firestoreData.forEach(async (doc) => {});
  await client.replyMessage(replyToken, {
    type: "text",
    altText: "no",
    text: "hello",
  });
};
module.exports = confirm;
