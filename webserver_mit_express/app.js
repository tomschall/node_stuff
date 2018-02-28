var express = require("express");

var app = express();

app.use("/middleware", function(req, res, next) {
    console.log(req.url);
    //res.send("app use wird hier ausgeführt");
    next();
});

app.get("/", function(req, res) {
    res.send("Hallo Welt");
});

app.get("/startseite", function(req, res) {
    res.send("Startseite");
});

app.get("/info", function(req, res) {
    res.send("Info");
});

app.listen(8080);