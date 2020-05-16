// Dependencies
// =============================================================
var router = require('express').Router();
var passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google, implement google strategy
router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

//  callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    res.send('you reached the callback URI')
});

module.exports = router;