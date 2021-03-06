const express = require("express");
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("hello");
})

app.listen(process.env.PORT);