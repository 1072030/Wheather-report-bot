const firestore = require("../config/firebaseConfig");
const client = require("../config/client");
const beaconTypeConfirm = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  let data = [];
  firestoreData.forEach(async (doc) => {
    if (doc.data().BeaconId === parseInt(source.beacon.dm)) {
      //data.push({});
    }
  });
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
module.exports = beaconTypeConfirm;
