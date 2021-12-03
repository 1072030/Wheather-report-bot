const client = require("../config/client");
const handleBeacon = async (event, replyToken) => {
  await client.replyMessage(replyToken, {
    type: "flex",
    altText: "test",
    contents: {
      hero: {
        type: "image",
        url: "https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/4d3ea53c084bad6931a56d5158a48jpeg.jpeg?alt=media&token=3e06fbb5-e813-48d9-ad70-26b7fd85a396",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Brown Cafe",
            size: "22px",
            color: "#000000",
            weight: "bold",
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "text",
                        text: "Place",
                        color: "#d3d3d3",
                        size: "14px",
                        wrap: true,
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo No .1",
                        color: "#000000",
                        size: "14px",
                        wrap: true,
                        flex: 5,
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "text",
                        text: "Time",
                        color: "#d3d3d3",
                        size: "14px",
                        wrap: true,
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "10:00 - 23:00",
                        color: "#000000",
                        size: "14px",
                        wrap: true,
                        flex: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "CALL",
              uri: "https://v3.vuejs.org/guide/migration/v-model.html#migration-strategy",
            },
          },
          {
            type: "button",
            action: {
              type: "uri",
              label: "WEBSITE",
              uri: "https://developers.line.biz/flex-simulator/?status=success",
            },
          },
        ],
      },
      type: "bubble",
    },
  });
};

module.exports = handleBeacon;
