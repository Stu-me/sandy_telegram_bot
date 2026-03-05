// 

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TOKEN = process.env.TELEGRAM_API_TOKEN;

if (!TOKEN) {
  throw new Error("Telegram token missing in .env");
}

app.post("/new-message", async (req, res) => {

  console.log(JSON.stringify(req.body,null,2));

  if (!req.body.message) {
    return res.end("No message object");
  }

  const chatId = req.body.message.chat.id;

  try {

    await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: "Pollo"
      },
      { timeout: 5000 }
    );

    console.log("Message sent");

    res.end("ok");

  } catch (err) {

    console.log("Telegram error:", err.response?.data || err.message);

    res.end("error");

  }

});

app.listen(8080, () => {
  console.log("Server running on 8080");
});