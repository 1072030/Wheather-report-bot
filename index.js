const line = require("@line/bot-sdk");
const express = require("express");
const handleEvent = require("./wook/handleEvent");
const firestore = require("./config/firebaseConfig");
const config = {
  channelSecret: "b85d02c4583b0a223741ee0ea2e28c7c",
  channelAccessToken:
    "ZQkIGNlpA/3kmzloMpBXRCVla9qW7mUYpiN3ZcjYCBQolzbjYq60zKIOgoZtTNNM5IGIPG1kH4DxyxmugnM6QlJF1W4LmV+9osHEox2G1FDPKVWxIosj1o4VP8cKkdxf0gXo6bBjulEVnsAmlIDqZQdB04t89/1O/w1cDnyilFU=",
};
const client = new line.Client(config);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static("public"));
app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

app.post("/beacon", async (req, res) => {
  const firestoreData = await firestore.collection("BeaconTest").get();
  firestoreData.forEach(async (doc) => {
    // if (doc.data().beaconId === req.body.hwid) {
    //   await firestore.collection("BeaconTest").doc(doc.id).update(data);
    // }
  });
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
