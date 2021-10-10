const client = require("../config/client");
const handleLocation = require("../wook/handleLocation");
const handleText = require("../wook/handleText");
const handleBeacon = require("./handleBeacon");
const handleEvent = async (event) => {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }

  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        case "location":
          return handleLocation(message, event.replyToken);
        /*  case "image":
            return handleImage(message, event.replyToken);
          case "video":
            return handleVideo(message, event.replyToken);
          case "audio":
            return handleAudio(message, event.replyToken);
          case "location":
            return handleLocation(message, event.replyToken);
          case "sticker":
            return handleSticker(message, event.replyToken); */
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    case "beacon":
      return handleBeacon(event, event.replyToken);
  }
};

module.exports = handleEvent;
