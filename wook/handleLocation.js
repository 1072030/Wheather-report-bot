const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const handleLocation = async (message, replyToken) => {
  const LocationName = await fetchWeather();
  let confirmLocation = [];
  let bubble = [];
  let today = new Date();
  let time = [];
  time.push(today.getMonth() + 1);
  time.push(today.getDate());
  time.push(today.getMinutes());
  for (let i = 0, j = LocationName[0]["Location"].length; i < j; i++) {
    if (message.address.indexOf(LocationName[0]["Location"][i]) != -1) {
      confirmLocation.push({
        name: LocationName[0]["Location"][i],
        Weather: LocationName[1]["Weather"][i],
        MaxT: LocationName[2]["MaxT"][i],
        MinT: LocationName[3]["MinT"][i],
        Pop: LocationName[4]["Pop"][i],
      });
    }
  }
  console.log(confirmLocation);
  bubble.push({
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      contents: [
        {
          type: "text",
          text: `天氣預報 : ${confirmLocation[0].name}`,
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
                  text: "日期",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 2,
                  contents: [],
                },
                {
                  type: "text",
                  text: `${time[0]}月 ${time[1]}日`,
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
                  text: "氣溫",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 2,
                  contents: [],
                },
                {
                  type: "text",
                  text: `${confirmLocation[0].MaxT}℃ - ${confirmLocation[0].MinT}℃`,
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
                  text: "降雨機率",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 2,
                  contents: [],
                },
                {
                  type: "text",
                  text: `${confirmLocation[0].Pop}%`,
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
                  text: "天氣狀況",
                  size: "sm",
                  color: "#AAAAAA",
                  flex: 2,
                  contents: [],
                },
                {
                  type: "text",
                  text: `${confirmLocation[0].Weather}`,
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
    altText: "~!今日天氣預報!~ ",
    contents: {
      type: "carousel",
      contents: bubble,
    },
  });
};

module.exports = handleLocation;
