// used to route GET, POST and DELETE to and from the database

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
    // let userOIbj = { email: res.body.email, password: res.body.password}
    // res.json(userObj);
    // res.json("/members");
    res.json("/members");
  });

  // route for signing up a user. user's password is automatically hashed and stored securely based on
  // Sequelize User Model. if user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log('REQUEST',req.body)
    console.log(db.User)
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

// route used to update information for a specific user
  app.put("/api/user/:id", function(req,res){
    // update a row in User table where id matches req.params.id with new values from req.body
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function() {
      // send a truthy statement because client doesn't need DB data back
      res.send(true);
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

  // route used to get all reviews made by user
  app.get("/api/user/:id/reviews", function(req,res){
    // search Review table for all reviews where postId matches req.params.id
    db.Review.findAll({
      where: {
        postId: req.params.id
        // UserId: req.params.id
      },
    }).then(function(reviews) {
      res.json(reviews)
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

  // route used to get all reviews the user is following
  app.get("/api/user/:id/following", function(req,res){
    // search UserReview table where UserId matches req.params.id
    db.UserReview.findAll({
      where: {
        UserId: req.params.id
      },
      // join Review table for event data
      include: {
        model: db.Review,
        // join User table inside of review data for Post Name
        include: {
          model: db.User,
          as: "post",
          attributes: ["email"]
        }
      },
      raw:true //receives data in query
    }).then(function(users) {
      console.log(users)
      console.log("HERE!!!")
      res.json(users);
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

  // route used to get all reviews
  app.get("/api/review", function(req,res){
    // search Review table for all events
    db.Review.findAll({
      // join User since it contains the post's name
      include: [
        {
          model: db.User,
          as: "post",
          attributes: ["email"]
        }
      ],
    }).then(function(reviews) {
      res.json(reviews);
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

  // route used to create a new review
  app.post("/api/review", function(req,res){
    // create a new review with columns and values specified in req.body
    console.log('this is working!', req.body)
    db.Review.create(req.body)
      .then(function(reviewData) {
        db.UserReview.create({
          // postId: req.body.postId,
          UserId: req.body.postId,
          ReviewId: reviewData.id
        }).then(function() {
          res.send(true);
        }).catch(function(err) {
          console.log(err);
          res.send(false);
        })
      }).catch(function(err) {
        console.log(err);
        res.send(false);
      })
  })

  // route used to get 
  app.put("/api/review/:id", function(req,res){
    // update a reviews data with new values specified in req.body where review.id matches req.params.id
    db.Review.update(req.body, { where: { id: req.params.id } })
      .then(function() {
        res.send(true);
      }).catch(function(err) {
        console.log(err);
        res.send(false);
      })
  })

  // route used to delete an review
  app.delete("/api/review/:id", function(req,res){
    // completely remove an item in the Review table where review.id matches req.params.id
    db.Review.destroy({ where: { id: req.params.id } })
      .then(function() {
        res.send(true)
      }).catch(function(err) {
        console.log(err);
        res.send(false);
      })
  })

  // route used to get members for a specific review
  app.get("/api/review/:id/members", function(req,res){
    // search UseReview table where ReviewId matches req.params.id
    db.UserReview.findAll({
      where: {
        ReviewId: req.params.id
      },
      // join User table to get the user name
      include: {
        model: db.User,
        attributes: ["email"]
      }
    }).then(function(members){
      res.json(members)
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

  // route used to follow a review
  app.post("/api/follow", function(req,res){
    // check UserEvent if a row exists that matches req.body
    db.UserReview.findOne({
      where: req.body
    }).then(function(data) {
      // if it does, then...
      if (data) {
        // send a false statement to the client
        res.send(false)
      } else {
        // otherwise, create a new row in UserReview
        db.UserReview.create(req.body)
          .then(function() {
            res.send(true)
          }).catch(function(err) {
            console.log(err);
            res.send(false);
          })
      }
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

  // route used to unfollow a review
  app.delete("/api/unfollow", function(req,res){
    // remove a row in UserReview where UserId and ReviewId matches req.body
    db.UserReview.destroy({
      where: req.body
    }).then(function() {
      res.send(true);
    }).catch(function(err) {
      console.log(err);
      res.send(false);
    })
  })

};