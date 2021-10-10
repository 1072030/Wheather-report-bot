const client = require("../config/client");
const firestore = require("../config/firebaseConfig");
const beaconTypeConfirm = require("../beaconReply/confirm");
const handleBeacon = async (source, replyToken) => {
  console.log(source.beacon);
  const firestoreData = await firestore.collection("BeaconTest").get();
  firestoreData.forEach(async (doc) => {
    console.log(doc.data().type);
    if (doc.data().BeaconId === parseInt(source.beacon.dm)) {
      switch (doc.data().type) {
        case "text":
          return;
        case "image":
          return;
        case "confirm":
          return beaconTypeConfirm(source, replyToken);
      }
    }
  });
  // await client.replyMessage(replyToken, {
  //   type: "text",
  //   altText: "no",
  //   text: "hello",
  // });
};

module.exports = handleBeacon;
