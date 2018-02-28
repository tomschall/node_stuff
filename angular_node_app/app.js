var express = require("express");

var app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/public", express.static("public"));

app.get("/posts.json", function(req, res) {
    var posts = [
        { title: "Ich bin der erste Post (server)", description: "hier ist die desc 1" },
        { title: "Ich bin der zweite Post (server)", description: "hier ist die description 2" }
    ];
    res.json(posts);
});

app.get("/", function(req, res) {
    res.render("index");
});

app.listen(8080);