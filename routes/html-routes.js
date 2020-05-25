// require path for relative routes to HTML files
var path = require("path");

// requirie middleware for checking if user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app, path) {
  // app.get("/*", function(req,res){
  //   res.sendFile("/reviews.html", { root: path.join(__dirname, "../public") })
  // })

  app.get("/", function(req, res) {

    // if the user already has an account send them to the members (main) page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });


  app.get("/login", function(req, res) {
    // if the user already has an account send them to the members (main) page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // isAuthenticated middleware added to route
  // if a user who is not logged in tries to access route; will be 
  // redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // html routes to individual pages
  app.get("/home", function(req,res) {
    res.sendFile("/reviews.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/myreviews", function(req,res) {
    res.sendFile("/myreviews.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/following", function(req,res) {
    res.sendFile("/following.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/create", function(req,res) {
    res.sendFile("/create.html", { root: path.join(__dirname, "../public") })
  })
  app.get("/profile", function(req,res) {
    res.sendFile("/profile.html", { root: path.join(__dirname, "../public") })
  })
  // send default page to all routes that are undefined
  app.get("*", function(req,res) {
    res.sendFile("/index.html", { root: path.join(__dirname, "../public") })
  })
  
};