const fetchWeather = require("./fetchRequire");

const handleLocation = async (message, replyToken) => {
  const LocationName = await fetchWeather();
  console.log(LocationName[0]["Weather"]);
};

module.exports = handleLocation;
