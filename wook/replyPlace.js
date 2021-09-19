const client = require("../config/client");
const fetchWeather = require("./fetchRequire");

const replyPlace = async (Place, replyToken) => {
  const LocationName = await fetchWeather();

  return await client.replyMessage(replyToken, {});
};

module.exports = replyPlace;
