const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const handleLocation = async (message, replyToken) => {
  console.log(message);
  const LocationName = await fetchWeather();
  console.log(LocationName[0]["Location"]);
  let confirmLocation;
  for (let i = 0, j = LocationName.length; i < j; i++) {
    if (message.address.indexOf(LocationName[0]["Location"][i])) {
      confirmLocation = LocationName[i];
    }
  }
  return await client.replyMessage(replyToken, {
    type: "text",
    text: confirmLocation,
  });
};

module.exports = handleLocation;
