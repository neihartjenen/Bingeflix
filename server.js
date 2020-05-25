// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var path = require("path");

// Passport
var passport = require("./config/passport");
var PORT = process.env.PORT || 3000;
var db = require("./models");

// BodyParser
// =============================================================
var app = express(); //
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json()); 

app.use(express.urlencoded({ extended: true })); //For body parser
app.use(express.json());
app.use(express.static("public")); // set static root directory

// use sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app, path);

// //create home route
// app.get('/', function(req, res) {    
//   res.send('test - hello world!');
// });

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
