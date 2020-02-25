const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: "Please provide a rating between 1 and 5 stars.",
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "Please enter a valid number."
    }
  },
  text: {
    type: String
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  campground: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campground"
  }
});

module.exports = mongoose.model("Review", reviewSchema);
