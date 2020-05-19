// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 3000;
var db = require("./models");

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));

// use sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// //create home route
// app.get('/', function(req, res) {    
//   res.send('Welcome to Passport with Sequelize');
// });



// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
