const line = require("@line/bot-sdk");
const express = require("express");
const fetch = require("node-fetch");
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
async function handleText(message, replyToken, source) {
  let bubble = [];
  let position = [];
  let MaxT = [];
  let MinT = [];
  let Pop = [];
  let Weather = [];
  let location = [];
  let Tomorrow = [];
  let time = [];
  await fetch(
    `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-E444C840-BB67-49DE-929A-7C987250A02D&downloadType=WEB&format=JSON`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let city = json["cwbopendata"]["dataset"]["location"];
      for (let i = 0, j = city.length; i < j; i++) {
        position.push(city[i].locationName);
      }
      console.log(position);
      for (let i = 0, p = position.length; i < p; i++) {
        for (let j = 0; j < 4; j++) {
          switch (j) {
            case 0:
              Weather.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
            case 1:
              MaxT.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
            case 2:
              MinT.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
            case 4:
              Pop.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
          }
        }
      }
      location.push(
        {
          Weather: Weather,
        },
        {
          MaxT: MaxT,
        },
        {
          MinT: MinT,
        },
        {
          Pop: Pop,
        }
      );
      console.log(location);
    }); //end fetch
  bubble.push({
    type: "bubble",
    hero: {
      type: "image",
      url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_3_movie.png",
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
      action: {
        type: "uri",
        label: "Action",
        uri: "https://linecorp.com/",
      },
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      contents: [
        {
          type: "text",
          text: "BROWN'S ADVENTURE\nIN MOVIE",
          weight: "bold",
          size: "xl",
          gravity: "center",
          wrap: true,
          contents: [],
        },
        {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          margin: "lg",
          contents: [
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "Date",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 1,
                  contents: [],
                },
                {
                  type: "text",
                  text: "Monday 25, 9:00PM",
                  size: "sm",
                  color: "#666666",
                  flex: 4,
                  wrap: true,
                  contents: [],
                },
              ],
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "Place",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 1,
                  contents: [],
                },
                {
                  type: "text",
                  text: "7 Floor, No.3",
                  size: "sm",
                  color: "#666666",
                  flex: 4,
                  wrap: true,
                  contents: [],
                },
              ],
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "Seats",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 1,
                  contents: [],
                },
                {
                  type: "text",
                  text: "C Row, 18 Seat",
                  size: "sm",
                  color: "#666666",
                  flex: 4,
                  wrap: true,
                  contents: [],
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return await client.replyMessage(replyToken, {
    type: "flex",
    altText: "Test",
    contents: {
      type: "carousel",
      contents: bubble,
    },
  });
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
