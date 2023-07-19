const Movie = require("../pkg/movies/moviesShmea");

exports.getLoginForm = (req, res) => {
  try {
    res.status(200).render("login", {
      title: "Login",
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.movieView = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).render("viewFilms", {
      status: "success",
      naslov: "HBO",
      kategorija: "comedy",
      movies,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createMovie = async (req, res) => {
  try {
    await Movie.create(req.body);
    res.redirect("/viewMovies");
  } catch (err) {
    res.status(500).send(err);
  }
};
