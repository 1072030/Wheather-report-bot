const client = require("../config/client");
const fetchWeather = require("./fetchRequire");
const replyPlace = require("./replyPlace");
const serviceAccount = require("../config/weather-line-bot-1-firebase-adminsdk-0byt9-5ebcd9f602.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();

const handleText = async (message, replyToken, source) => {
  const LocationName = await fetchWeather();
  console.log(source.userId);
  const firestoreData = await firestore.collection("User").get();
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
                label: "查詢地區天氣",
                text: "查詢地區天氣",
              },
            },
          ],
        },
      });

    /* case "今日天氣預報":
      let isUser = false;
      let bubble = [];
      let confirmLocation = [];
      let city;
      firestoreData.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        if (doc.data().userId === source.userId) {
          console.log(doc.data());
          isUser = true;
          city = doc.data().city;
        }
      });
      if (isUser) {
        let today = new Date();
        let time = [];
        time.push(today.getMonth() + 1);
        time.push(today.getDate());
        time.push(today.getMinutes());
        for (let i = 0, j = LocationName[0]["Location"].length; i < j; i++) {
          if (city.indexOf(LocationName[0]["Location"][i]) != -1) {
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
      } else {
        return client.replyMessage(replyToken, {
          type: "text",
          text: "沒有找到您的資料，重新設定中，輸入'設定'重新設定地區 :)",
        });
      } */

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
    /* case "設定":
      return await client.replyMessage(replyToken, {
        type: "text",
        text: "選擇設定區域",
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
      }); */
    default:
      if (
        message.text.indexOf("縣") != -1 ||
        message.text.indexOf("市") != -1
      ) {
        replyPlace(message.text, replyToken);
      } /* else if (
        (message.text.indexOf("縣") != -1 ||
          message.text.indexOf("市") != -1) &&
        isSetting == true
      ) {
        isSetting = false;
        firestoreData.forEach(async (doc) => {
          if (doc.data().userId === source.userId) {
            await firestore
              .collection("User")
              .doc(doc.id)
              .update({ city: message.text });
          }
        });
        return await client.replyMessage(replyToken, {
          type: "text",
          text: `設定成功 !~ 可以輸入 "天氣"重新查詢地區天氣唷~`,
        });
      } */ else {
        return await client.replyMessage(replyToken, {
          type: "text",
          text: `我不知道"${message.text}"是什麼意思，但是可以輸入"天氣"來查詢天氣狀況唷!~`,
        });
      }
  }
};

module.exports = handleText;
