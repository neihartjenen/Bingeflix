// Dependencies
// =============================================================
var express = require("express");
var authRoutes = require('./routes/auth-routes');
var passportSetup = require('./config/passport-setup');
var mongoose = require('mongoose');
var keys = require('./config/keys')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//set up view engine
app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb')
})

//set up routes
app.use('/auth', authRoutes);

//create home route
app.get('/', (req, res) => {
    res.render('home');
});



// Starts the server to begin listening
// =============================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});