const line = require("@line/bot-sdk");
const express = require("express");
const config = require("../config/lineConfig");
const handleEvent = require("../hook/handleEvent");
const router = express.Router();
router.post("/callback", line.middleware(config), (req, res) => {
  console.log(req);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("error", err);
      res.status(500).end();
    });
});

module.exports = router;
