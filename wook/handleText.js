const client = require("../config/client");
const fetchWeather = require("./fetchRequire");
const replyPlace = require("./replyPlace");
const handleText = async (message, replyToken, source) => {
  const LocationName = await fetchWeather();
  switch (message.text) {
    case "天氣":
      return await client.replyMessage(replyToken, {
        type: "text",
        text: "今日天氣預報還是查詢地區天氣呢?",
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
                label: "查詢地區天氣",
                text: "查詢地區天氣",
              },
            },
          ],
        },
      });

    case "今日天氣預報":
      let bubble = [];
      bubble.push({
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          spacing: "md",
          contents: [
            {
              type: "text",
              text: "天氣預報 : ",
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
                      text: "氣溫",
                      size: "sm",
                      color: "#AAAAAA",
                      flex: 2,
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
                      text: "降雨機率",
                      size: "sm",
                      color: "#AAAAAA",
                      flex: 2,
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
        altText: "~!今日天氣預報!~ ",
        contents: {
          type: "carousel",
          contents: bubble,
        },
      });

    case "查詢地區天氣":
      return await client.replyMessage(replyToken, {
        type: "text",
        text: "選擇查詢區域",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "location",
                label: "傳送位置",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "台北市",
                text: "台北市",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "桃園市",
                text: "桃園市",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "台中市",
                text: "台中市",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "臺南市",
                text: "臺南市",
              },
            },
          ],
        },
      });
    default:
      if (
        message.text.indexOf("縣") != -1 ||
        message.text.indexOf("市") != -1
      ) {
        replyPlace(message.text, replyToken);
      } else {
        return await client.replyMessage(replyToken, {
          type: "text",
          text: `我不知道"${message.text}"是什麼意思，但是可以輸入"天氣"來查詢天氣狀況唷!~`,
        });
      }
  }
};

module.exports = handleText;
