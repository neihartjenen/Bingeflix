// Dependencies
// =============================================================
var express = require("express");
var authRoutes = require('./routes/auth-routes');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//set up view engine
app.set('view engine', 'ejs');

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