const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const replyPlace = async (Place, replyToken) => {
  const LocationName = await fetchWeather();
  console.log(LocationName);
  let confirmLocation = [];

  for (let i = 0, j = LocationName[0]["Location"].length; i < j; i++) {
    if (Place.indexOf(LocationName[0]["Location"][i]) != -1) {
      confirmLocation.push(
        {
          name: LocationName[0]["Location"][i],
        },
        {
          Weather: LocationName[0]["Weather"][i],
        },
        {
          MaxT: LocationName[0]["MaxT"][i],
        },
        {
          MinT: LocationName[0]["MinT"][i],
        },
        {
          Pop: LocationName[0]["Pop"][i],
        }
      );
    }
  }
  console.log(confirmLocation);
  return await client.replyMessage(replyToken, {
    type: "text",
    text: "test",
  });
};

module.exports = replyPlace;
