// router instance
var router = require('express').Router();

//auth login 'auth/login'
router.get('/login', (req, res) => {
    // renders login page w/ google button 'auth/login'
    res.render('login');
});

//auth logout 'auth/logout'
router.get('/logout', (req, res) => {
    //handle with passport
    //placeholder
    res.send('log out');
});

//auth w/ google 'auth/google'
router.get('/google', (req, res) => {
    //handle with passport
    //placeholder
    res.send('login in with google')
});

//exports router handlers
module.exports = router;