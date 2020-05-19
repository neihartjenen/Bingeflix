// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));

//create home route
app.get('/', (req, res) => {
    res.send('Welcome to Passport with Sequelize and without HandleBars');
});



// Starts the server to begin listening
// =============================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});

