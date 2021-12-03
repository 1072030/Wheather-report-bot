const client = require("../config/client");

const handleBeacon = async (event, replyToken) => {
  await client.replyMessage(replyToken, {
    type: "flex",
    contents: [
      {
        type: "carousel",
        contents: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://aws-uploade-image-test2.s3.amazonaws.com/0ei9wdytys9324fyqxh2dk.png",
                  action: {
                    type: "message",
                    label: "動作 1",
                    text: "動作 1",
                  },
                },
                {
                  imageUrl:
                    "https://aws-uploade-image-test2.s3.amazonaws.com/0ei9wdytys9324fyqxh2dk.png",
                  action: {
                    type: "message",
                    label: "動作 2",
                    text: "動作 2",
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  });
};

module.exports = handleBeacon;
