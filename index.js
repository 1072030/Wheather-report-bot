const line = require("@line/bot-sdk");
const express = require("express");
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
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

app.post("/callback", (req, res) => {
  console.log(req);
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
function handleEvent(event) {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }

  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        /*  case "image":
          return handleImage(message, event.replyToken);
        case "video":
          return handleVideo(message, event.replyToken);
        case "audio":
          return handleAudio(message, event.replyToken);
        case "location":
          return handleLocation(message, event.replyToken);
        case "sticker":
          return handleSticker(message, event.replyToken); */
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
  }
}
function handleText(message, replyToken, source) {
  return client.replyMessage(replyToken, {
    type: "template",
    altText: "Buttons alt text",
    template: {
      type: "buttons",
      thumbnailImageUrl: buttonsImageURL,
      title: "My button sample",
      text: "Hello, my button",
      actions: [
        { label: "Go to line.me", type: "uri", uri: "https://line.me" },
        { label: "Say hello1", type: "postback", data: "hello こんにちは" },
        {
          label: "言 hello2",
          type: "postback",
          data: "hello こんにちは",
          text: "hello こんにちは",
        },
        { label: "Say message", type: "message", text: "Rice=米" },
      ],
    },
  });
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
