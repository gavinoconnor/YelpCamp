const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//Root route
router.get("/", function(req, res) {
  res.render("landing");
  })

//Register form route
router.get("/register", function(req, res) {
  res.render("register");
});

//Sign Up route
router.post("/register", function(req, res) {
  let newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      return res.render("register", {"error": err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp, " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

//Login route
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

//Logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Succesfully logged out.")
  res.redirect("/campgrounds");
});


module.exports = router;
