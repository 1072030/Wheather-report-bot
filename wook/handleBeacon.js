const client = require("../config/client");
const firestore = require("../config/firebaseConfig");
const beaconTypeConfirm = require("../beaconReply/confirm");
const handleBeacon = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  // firestoreData.forEach(async (doc) => {
  //   if (doc.data().BeaconId === parseInt(source.beacon.dm)) {
  //     switch (doc.data().type) {
  //       case "text":
  //         return;
  //       case "image":
  //         return;
  //       case "confirm":
  //         return beaconTypeConfirm(source, replyToken);
  //     }
  //   }
  // });
  await client.replyMessage(replyToken, {
    type: "template",
    altText: "this is a confirm template",
    template: {
      type: "confirm",
      actions: [
        {
          type: "uri",
          label: "是",
          uri: "https://bootstrap5.hexschool.com/docs/5.0/forms/input-group/",
        },
        {
          type: "message",
          label: "否",
          text: "否",
        },
      ],
      text: "您確定嗎？",
    },
  });
};

module.exports = handleBeacon;
