const client = require("../config/client");
const firestore = require("../config/firebaseConfig");
const handleBeacon = async (source, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  firestoreData.forEach(async (doc) => {
    if (doc.data().BeaconId === source.beacon.dm) {
      console.log(doc.data().BeaconId);
      console.log("this id is match");
      // await firestore
      //   .collection("BeaconTest")
      //   .doc(doc.id)
      //   .update({ city: data[0] });
    } else {
      console.log("this id doesn't match");
    }
  });
  console.log(source);
  // await client.replyMessage(replyToken, {
  //   type: "text",
  //   text: "hello",
  // });
};

module.exports = handleBeacon;
