const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const handleLocation = async (message, replyToken) => {
  console.log(message);
  const LocationName = await fetchWeather();
  console.log(LocationName[0]["Location"]);
  let confirmLocation;
  /* if (LocationName.includes(message.text)) {
  } */
  return await client.replyMessage(replyToken, {
    type: "text",
    text: "test",
  });
};

module.exports = handleLocation;
