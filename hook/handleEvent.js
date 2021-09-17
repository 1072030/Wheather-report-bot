const handleText = require("../hook/handleText");
const handleEvent = async (event) => {
  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        // case "image":
        //   return handleImage(message, event.replyToken);
        // case "location":
        // return handleLocation(message, event.replyToken);
        // default:
        //   throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
};

module.exports = handleEvent;
