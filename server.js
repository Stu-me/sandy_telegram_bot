const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_API_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.post("/new-message", async (req,res) => {

    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `You said: ${text}`
    });

    res.sendStatus(200);
});

app.listen(3000, ()=>{
    console.log("bot server running");
});