const dotenv = require("dotenv");
const express = require("express");
const { chat } = require("./data/data");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {res.send("Hello World");});

app.get("/api/chat", (req, res) => {res.send(chat);});

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chat.find((user) => user._id === req.params.id);
    res.send(singleChat)
});



app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});