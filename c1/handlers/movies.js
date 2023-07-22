const Movie = require("../pkg/movies/moviesShmea");

exports.getAll = async (req, res) => {
  try {
    console.log(req.semos);

    // so populate metodata namesto idinja gi popoulirame so nivnite vrednosti
    let movies = await Movie.find().populate("author");
    res.status(200).json({
      status: "success",
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    console.log(req.semos);
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.replace = async (req, res) => {
  try {
    const movie = await Movie.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

exports.createByUser = async (req, res, next) => {
  try {
    // const userId = req.auth.id;
    //! poradi sto imame implementirano expressjwt toj kreira
    //! objekt so koj imame pristap a go kreira so metoda jwt.decode
    const moviePost = await Movie.create({
      title: req.body.title,
      year: req.body.year,
      imdbRating: req.body.imdbRating,
      author: req.auth.id,
    });

    res.status(201).json(moviePost);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const userId = req.auth.id;
    //! vrshime query na avtorot od korisnikot sto e logiran
    const mineMovies = await Movie.find({ author: userId });

    res.status(201).json(mineMovies);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
