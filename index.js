const line = require("@line/bot-sdk");
const express = require("express");
const app = express();
const config = require("./config/lineConfig");
const handleText = require("./hook/handleText");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

app.post("/callback", line.middleware(config), (req, res) => {
  console.log(req);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("error", err);
      res.status(500).end();
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
}); //

const handleEvent = async (event) => {
  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        // case "image":
        //   return handleImage(message, event.replyToken);
        // case "location":
        // return handleLocation(message, event.replyToken);
        // default:
        //   throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
};
