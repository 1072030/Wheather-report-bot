const handleBeacon = async (replyToken) => {
  await client.replyMessage(replyToken, {
    type: "test",
    text: "Hello, world 1",
  });
};

module.exports = handleBeacon;
