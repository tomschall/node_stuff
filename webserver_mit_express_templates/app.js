var express = require("express");

var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
    res.render("landing", {
        title: "Node.JS",
        items: [
            "express",
            "node",
            "javascript"
        ],
        desc: "<script type='text/javascript'>alert('hi');</script>"
    });
});

app.get("/startseite", function(req, res) {
    res.send("Startseite");
});

app.listen(8080);