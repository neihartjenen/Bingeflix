// used to route GET and POST from and to the database

// require models and passport 
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function(app) {

    // using the passport.authenticate middleware with our local strategy
    // if user has valid login credentials, send them to the members page.
    // else user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {

    // send the user back the route to the members page because the redirect will happen on the front end
    // they won't be able to access this page if they aren't authed
    res.json("/members");
  });

  // route for signing up a user. user's password is automatically hashed and stored securely based on
  // Sequelize User Model. if user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log('REQUEST',req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function(dbUser) {
      // redirect
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // app.post("/api/signup", function(req, res) {
  //   console.log('REQUEST',req.body)
  //   db.User.create(req.body)
  //    .then(function(dbUser) {
  //      console.log(dbUser);
  //      // redirect
  //     res.redirect(307, "/api/login");
  //   }).catch(function(err) {
  //     console.log(err);
  //     res.json(err);
  //     // res.status(422).json(err.errors[0].message);
  //   });
  // });

  // route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // the user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};