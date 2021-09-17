const line = require("@line/bot-sdk");
const config = require("./lineConfig");
const client = new line.Client(config);

module.exports = client;
