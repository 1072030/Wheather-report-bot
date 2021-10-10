const client = require("../config/client");
const firestore = require("../config/firebaseConfig");
const handleBeacon = async (contents, replyToken) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  // firestoreData.forEach(async (doc) => {
  //   if (doc.data().beaconId === source.userId) {

  //     console.log('')
  //     // await firestore
  //     //   .collection("BeaconTest")
  //     //   .doc(doc.id)
  //     //   .update({ city: data[0] });
  //   }
  //   //  else {
  //   //   await firestore
  //   //     .collection("User")
  //   //     .doc(rand)
  //   //     .set({ userId: source.userId, city: data[0] });
  //   // }
  // });
  console.log(contents);
  // await client.replyMessage(replyToken, {
  //   type: "text",
  //   text: "hello",
  // });
};

module.exports = handleBeacon;
