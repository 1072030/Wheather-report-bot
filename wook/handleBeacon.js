const client = require("../config/client");

const handleBeacon = async (contents, replyToken) => {
  client.replyMessage(replyToken, {
    type: "text",
    text: contents,
  });
};

module.exports = handleBeacon;
