const client = require("../config/client");
const fetchWeather = require("./fetchRequire");
const handleText = async (message, replyToken, source) => {
  switch (message.text) {
    case "天氣":
      return await client.replyMessage(replyToken, {
        type: "text",
        text: "今日天氣預報還是明日天氣預報",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                label: "今日天氣預報",
                text: "今日天氣預報",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "明日天氣預報",
                text: "明日天氣預報",
              },
            },
          ],
        },
      });

    case "今日天氣預報":
      let bubble = [];
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

    case "明日天氣預報":
      return await client.replyMessage(replyToken, {});
  }
};

module.exports = handleText;
