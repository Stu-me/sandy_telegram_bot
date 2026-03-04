let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv').config();


app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({extended:true})
)

app.post("/new-message",(req,res)=>{
    const {message} = req.body;

    if(!message || message.text.toLowerCase().indexOf("marco")<0){
        // if empty or no macro found in the lowercased of the message
        return res.json({
            msg:" the impotant keyword is missing "
        })
    }
    axios
    .post("https://api.telegram.org/bot"+process.env.TELEGRAM_API_TOKEN+"/sendMessage",{
        chat_id:message.chat.id,
        text:"Pollo",
    })
    .then((response)=>{
        // we get here if the message was successfully posted
        console.log("Message was posted ");
        res.end("ok");
    })
    .catch((err)=>{
        console.log("Error:",err);
        res.end("Error:",err)
    })

})

app.listen(8080,(req,res)=>{
    console.log("server started");
})