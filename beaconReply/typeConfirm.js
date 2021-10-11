const firestore = require("../config/firebaseConfig");
const client = require("../config/client");
const beaconTypeConfirm = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  const content = {};
  firestoreData.forEach(async (doc) => {
    if (doc.data().beaconId === source.beacon.dm) {
      var { ...data } = doc.data();
      content = data;
    }
  });
  console.log(content);
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
