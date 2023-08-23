const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  year: {
    type: Number,
  },
  imdbRating: {
    type: Number,
  },
  // so ova se referencira za sto kje bide idito od koja kolekcija
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  slika: {
    type: String,
    default: "default.jpg",
  },
  sliki: {
    type: [String],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
