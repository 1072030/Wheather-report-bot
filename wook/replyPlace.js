const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const replyPlace = async (Place, replyToken) => {
  const LocationName = await fetchWeather();
  let confirmLocation;
  let Weather;
  let MaxT;
  let MinT;
  let Pop;
  let time;
  for (let i = 0, j = LocationName[0]["Location"].length; i < j; i++) {
    if (Place.indexOf(LocationName[0]["Location"][i]) != -1) {
      confirmLocation = LocationName[0]["Location"][i];
      Weather = LocationName[0]["Weatehr"][i];
      MaxT = LocationName[0]["MaxT"][i];
      MinT = LocationName[0]["MinT"][i];
      Pop = LocationName[0]["Pop"][i];
    }
  }
  return await client.replyMessage(replyToken, {
    type: "text",
    text: "test",
  });
};

module.exports = replyPlace;
