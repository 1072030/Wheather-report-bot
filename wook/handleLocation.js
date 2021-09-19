const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const handleLocation = async (message, replyToken) => {
  console.log(message.address);
  const LocationName = await fetchWeather();
  console.log(LocationName[0]["Location"]);
  let confirmLocation;
  for (let i = 0, j = LocationName[0]["Location"].length; i < j; i++) {
    if (message.address.indexOf(LocationName[0]["Location"][i]) != -1) {
      confirmLocation = LocationName[0]["Location"][i];
    }
  }
  console.log(confirmLocation);
  return await client.replyMessage(replyToken, {
    type: "text",
    text: `您所在區域是${confirmLocation}嗎`,
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "是",
            text: confirmLocation,
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "不是,重新輸入",
            text: "天氣",
          },
        },
      ],
    },
  });
};

module.exports = handleLocation;
