// Dependencies
// =============================================================
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        // options for google strategy
    }, () => {
        // passport callback function
    })
);