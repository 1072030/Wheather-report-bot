const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const replyPlace = async (Place, replyToken) => {
  const LocationName = await fetchWeather();
  let confirmLocation = [];
  let bubble = [];
  let time = [];
  let today = new Date();
  time.push(today.getMonth() + 1);
  time.push(today.getDate());
  time.push(today.getMinutes());
  for (let i = 0, j = LocationName[0]["Location"].length; i < j; i++) {
    if (Place.indexOf(LocationName[0]["Location"][i]) != -1) {
      confirmLocation.push({
        name: LocationName[0]["Location"][i],
        Weather: LocationName[1]["Weather"][i],
        MaxT: LocationName[2]["MaxT"][i],
        MinT: LocationName[3]["MinT"][i],
        Pop: LocationName[4]["Pop"][i],
      });
    }
  }
  bubble.push({
    type: "bubble",
    /* hero: {
      type: "image",
      url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_3_movie.png",
      size: "full",
      aspectRatio: "2:3",
      aspectMode: "fit",
      backgroundColor: "#FFFFFFFF",
      position: "absolute",
    }, */
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

module.exports = replyPlace;
