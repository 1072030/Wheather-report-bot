const line = require("@line/bot-sdk");
const express = require("express");
const handleEvent = require("./wook/handleEvent");
const EddystoneBeaconScanner = require("eddystone-beacon-scanner");
const config = {
  channelSecret: "b85d02c4583b0a223741ee0ea2e28c7c",
  channelAccessToken:
    "ZQkIGNlpA/3kmzloMpBXRCVla9qW7mUYpiN3ZcjYCBQolzbjYq60zKIOgoZtTNNM5IGIPG1kH4DxyxmugnM6QlJF1W4LmV+9osHEox2G1FDPKVWxIosj1o4VP8cKkdxf0gXo6bBjulEVnsAmlIDqZQdB04t89/1O/w1cDnyilFU=",
};
const client = new line.Client(config);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));
app.get("/", async (_, res) => {
  console.log("test");
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});
EddystoneBeaconScanner.on("found", function (beacon) {
  console.log("found Eddystone Beacon:\n", JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.on("updated", function (beacon) {
  console.log("updated Eddystone Beacon:\n", JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.on("lost", function (beacon) {
  console.log("lost Eddystone beacon:\n", JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.startScanning(true);
app.post("/callback", (req, res) => {
  console.log(req.body.events, "ts");
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
