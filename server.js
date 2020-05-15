// Dependencies
// =============================================================
var express = require("express");
var authRoutes = require('./routes/auth-routes');
var passportSetup = require('./config/passport-setup');
const Sequelize = require('sequelize');
var keys = require('./config/keys')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//set up view engine
app.set('view engine', 'ejs');

//connect to mongodb
Sequelize.connect(keys.mongodb.dbURI, () => {
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
app.listen(PORT, function() {
    console.log("App listening on: http://localhost:"+ PORT);
  });