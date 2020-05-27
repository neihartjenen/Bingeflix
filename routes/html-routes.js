// require path for relative routes to HTML files
var path = require("path");

// requirie middleware for checking if user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/signup", function(req, res) {

    // if the user already has an account send them to the members page
    // console.log(req.user);
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });

  app.get("/login", function(req, res) {
    // if the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });

  // isAuthenticated middleware added to route
  // if a user who is not logged in tries to access route; will be 
  // redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/members.html"));
  });

  // html routes to individual pages
  app.get("/tvreviews", function(req,res) {
    // res.sendFile(path.join(__dirname, "../views/tvreviews.html"));
    res.sendFile("/tvreviews.html", { root: path.join(__dirname, "../views") })
  })
  app.get("/myreviews", function(req,res) {
    // res.sendFile(path.join(__dirname, "../views/myreviews.html"));
    res.sendFile("/myreviews.html", { root: path.join(__dirname, "../views") })
  })
  app.get("/following", function(req,res) {
    // res.sendFile(path.join(__dirname, "../views/following.html"));
    res.sendFile("/following.html", { root: path.join(__dirname, "../views") })
  })
  app.get("/create", function(req,res) {
    // res.sendFile(path.join(__dirname, "../views/create.html"));
    res.sendFile("/create.html", { root: path.join(__dirname, "../views") })
  })
  app.get("/profile", function(req,res) {
    // res.sendFile(path.join(__dirname, "../views/profile.html"));
    res.sendFile("/profile.html", { root: path.join(__dirname, "../views") })
  })
  // send default page to all routes that are undefined
  app.get("*", function(req,res) {
    // res.sendFile(path.join(__dirname, "../views/index.html"));
    res.sendFile("/index.html", { root: path.join(__dirname, "../views") })
  })
};