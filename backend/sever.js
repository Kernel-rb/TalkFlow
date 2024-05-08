const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/chat" , (req, res) => {
    res.send("Hello Chat");
});

app.get("/api/chat/:id", (req, res) => {
    res.send("Hello Chat " + req.params.id);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});