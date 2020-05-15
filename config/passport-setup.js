// Dependencies
// =============================================================
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = reqiure(./keys);

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID:keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, () => {
        // passport callback function
    })
);