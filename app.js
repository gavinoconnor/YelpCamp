const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
})

app.get("/campgrounds", function(req, res) {
  let campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
    {name: "Balder's Pass", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}
  ];
  res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function() {
  console.log("YelpCamp Server Has Started.")
})
