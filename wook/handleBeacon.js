const client = require("../config/client");
const firestore = require("../config/firebaseConfig");
const beaconTypeConfirm = require("../beaconReply/typeConfirm");
const beaconTypeText = require("../beaconReply/typeText");
const handleBeacon = async (source, replyToken) => {
  console.log(source.beacon);
  const firestoreData = await firestore.collection("BeaconTest").get();
  firestoreData.forEach(async (doc) => {
    if (doc.data().beaconId === source.beacon.dm) {
      console.log(doc.data().type);
      switch (doc.data().type) {
        case "text":
          return beaconTypeText(source, replyToken);
        case "image":
          return;
        case "confirm":
          return beaconTypeConfirm(source, replyToken);
        case "bubble":
          return beaconTypeBubble(source, replyToken);
        case "image_carousel":
          return;
      }
    }
  });
};

module.exports = handleBeacon;
