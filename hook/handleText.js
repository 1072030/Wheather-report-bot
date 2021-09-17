const client = require("../config/client");

const handleText = async (message, replyToken, source) => {
  switch (message.text) {
    case "送禮自用兩相宜":
      return client.replyMessage(replyToken, {
        type: "text", // ①
        text: "請選擇想要的店家類別",
        quickReply: {
          // ②
          items: [
            {
              type: "action",
              action: {
                type: "uri",
                label: "周邊店家",
                uri: "https://line.me/R/nv/location/",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "精選店家",
                text: "精選店家",
              },
            },
          ],
        },
      });
  }
};

module.exports = handleText;
