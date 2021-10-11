const firestore = require("../config/firebaseConfig");
const client = require("../config/client");
const beaconTypeText = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  let data = [];
  firestoreData.forEach(async (doc) => {
    if (doc.data().beaconId === source.beacon.dm) {
      data.push({
        text: doc.data().text,
      });
    }
  });
  await client.replyMessage(replyToken, {
    type: "text",
    text: data[0].text,
  });
};
module.exports = beaconTypeText;