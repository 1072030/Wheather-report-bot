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
      console.log(fetchWeather(0));
      return await client.replyMessage(replyToken, {});

    case "明日天氣預報":
      return await client.replyMessage(replyToken, {});
  }
};

module.exports = handleText;
