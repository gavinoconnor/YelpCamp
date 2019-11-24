//Variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//mongoose deprecation fixes
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     description: "Huge granite hill. No bathrooms. No water."
//   }, function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campground:");
//       console.log(campground);
//     }
//   });

//Routes
app.get("/", function(req, res) {
  res.render("landing");
  })

//INDEX route
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

//CREATE route
app.post("/campgrounds", function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc}
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//NEW route
app.get("/campgrounds/new", function(req, res){
  res.render("new")
});

//SHOW route
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

//Server connect
app.listen(3000, function() {
  console.log("YelpCamp Server Has Started.")
})
