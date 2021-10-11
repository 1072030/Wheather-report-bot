const firestore = require("../config/firebaseConfig");
const client = require("../config/client");
const beaconTypeConfirm = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  let actionsArray = [];
  firestoreData.forEach(async (doc) => {
    if (doc.data().beaconId === source.beacon.dm) {
      var { ...data } = doc.data();

      if (data.confirmType === "text" && data.denyType === "text") {
        actionsArray.push(
          {
            type: "message",
            label: data.confirmLabel,
            text: data.confirmText,
          },
          {
            type: "message",
            label: data.denyLabel,
            text: data.denyText,
          }
        );
      } else if (data.confirmType === "uri" && data.denyType === "text") {
        actionsArray.push(
          {
            type: "uri",
            label: data.confirmLabel,
            uri: data.confirmUri,
          },
          {
            type: "message",
            label: data.denyLabel,
            text: data.denyText,
          }
        );
      } else if (data.confirmType === "text" && data.denyType === "uri") {
        actionsArray.push(
          {
            type: "message",
            label: data.confirmLabel,
            text: data.confirmText,
          },
          {
            type: "uri",
            label: data.denyLabel,
            uri: data.denyUri,
          }
        );
      } else if (data.confirmType === "uri" && data.denyType === "uri") {
        actionsArray.push(
          {
            type: "uri",
            label: data.confirmLabel,
            uri: data.confirmUri,
          },
          {
            type: "uri",
            label: data.denyLabel,
            uri: data.denyUri,
          }
        );
      } else {
        console.log("not match");
      }
      replyMessage(data, actionsArray, replyToken);
    }
  });
};
const replyMessage = async (data, actionsArray, replyToken) => {
  await client.replyMessage(replyToken, {
    type: "template",
    altText: data.altText,
    template: {
      type: "confirm",
      actions: actionsArray,
      text: data.contentText,
    },
  });
};
module.exports = beaconTypeConfirm;
