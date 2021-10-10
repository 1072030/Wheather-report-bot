const client = require("../config/client");

const handleBeacon = async (contents, replyToken) => {
  console.log(contents);
  await client.replyMessage(replyToken, {
    type: "text",
    text: "hello",
  });
};

module.exports = handleBeacon;
