const line = require("@line/bot-sdk");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});
const handleEventRouter = require("./routes/webhook");
app.use("/", handleEventRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
}); //
