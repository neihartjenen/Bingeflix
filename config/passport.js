var express = require("express");
var PORT = process.env.PORT || 3306;
var app = express();
require("dotenv").config();
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Import routes
var router = require("./controllers/task_controller.js");
app.use(router);

// Import models for syncing

var db = require("./models");

// Syncing the database to the server. 

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Server Listening on: http://localhost:" + PORT);
    });

});