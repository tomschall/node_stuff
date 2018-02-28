var Sequelize = require("sequelize");
var sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    
    storage: __dirname + "/../database.sqlite"
});


// Model definieren
var Url = sequelize.define("url", {
    url: {
        type: Sequelize.STRING, 
        field: "url"
    },
    desc: {
        type: Sequelize.STRING,
        field: "desc"
    }
});

module.exports = {
    sequelize: sequelize, 
    Url: Url
}

/*
// Einzelnes Model erstellen --> Nur Url wird erstellt
Url.sync({force: true}).then(function() {
    console.log("Tabelle wurde erstellt!");
    
    // Daten einfügen
    Url.create({
        url: "http://google.de",
        desc: "Eine Suchmaschine"
    });
});
*/
