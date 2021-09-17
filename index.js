const line = require("@line/bot-sdk");
const express = require("express");
const app = express();
const handleEvent = require("./hook/handleEvent");
const config = require("./config/lineConfig");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

app.post("/callback", line.middleware(config), (req, res) => {
  console.log(req);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("error", err);
      res.status(500).end();
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
}); //
