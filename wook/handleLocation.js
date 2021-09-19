const fetchWeather = require("./fetchRequire");

const handleLocation = async (message, replyToken) => {
  const LocationName = fetchWeather();
  console.log(LocationName["Weather"]);
};

module.exports = handleLocation;
