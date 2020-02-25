const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// INDEX route
router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  });
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let price = req.body.price;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampground = {name: name, image: image, description: desc, price: price, author: author}
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      console.log(newlyCreated)
      res.redirect("/campgrounds");
    }
  });
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new")
});

// SHOW route
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").populate("reviews").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  })
});

// UPDATE route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});

// DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
