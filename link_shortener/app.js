var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var models = require("./models");

models.sequelize.sync({force: true}).then(function() {
    console.log("Tabellen erstellt!!!!"); 
    
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use("/public", express.static("public"));

    app.get("/", function(req, res, next) {
        var id = parseInt(req.query.q, 10);
        if (isNaN(id)) {
            res.render("pages/landing");    
        } else {
            models.Url.findById(id).then(function(obj) {
                if (obj == null) {
                    var err = new Error("Fehler");
                    err.status = 400;
                    next(err);
                } else {
                    res.render("pages/redirect", {
                        url: obj
                    });    
                }
                      
            });
        }
    });
    
    app.post("/create", function(req, res) {
        models.Url.create({
            url: req.body.url,
            desc: req.body.desc
        }).then(function(obj){
            console.log(obj.id);
            res.redirect("/created?id=" + obj.id);    
        });
        
    });
    
    app.get("/created", function(req, res){
        var id = parseInt(req.query.id, 10);
        models.Url.findById(id).then(function(obj){
            if (obj == null) {
                res.end("Fehler");
            } else {
                res.render("pages/created", {
                    url: obj
                });    
            }
        });
    });
    
    app.get("/test-error", function(req, res) {
        var error = new Error("TEST 123 ERROR");
        error.status = 404;
        throw error;
    });
    
    app.use(function(err, req, res, next) {
        var status = 500;
        if (err.status) {
            status = err.status
        }
        console.log("Error aufgetreten");
        console.error(err.stack);
        res.status(status).send("Something broke");
    });

    app.listen(8080, function(){
        console.log("Webserver wurde auf Port 8080 gestartet");
    });
});

