const Movie = require("../pkg/movies/moviesShmea");

//* so multer ovozmozuvame uploaderanje na fojlovi vo nashata aplikacija
//! npm install multer
//* generiranje na unikatni idinja
//! npm instal uuid

const multer = require("multer");
const uuid = require("uuid");

const imageId = uuid.v4();

//! so multerStorage definirame na koja lokacija i kakvo ime bi imale slikite
const multerStorage = multer.diskStorage({
  //* Destinacijata ima tri parametri req, file i callback
  destination: (req, file, callback) => {
    // prv parametar e error, vtor parametar e patekata
    // kade bi sakale da se zacuvaat slikite
    callback(null, "public/img/movies");
  },
  filename: (req, file, callback) => {
    //! - movie-unikatenId-timestamp.jpg so vakov format
    //! garantirame deka nema da ima povekje sliki so isto ime
    const ext = file.mimetype.split("/")[1];
    callback(null, `movie-${imageId}-${Date.now()}.${ext}`);
  },
});

//! so multerFilter definirame kakov tip na fajlovi kje prima nashiot server
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("file type not supported"), false);
  }
};

//! i vo upload stavame konfiguarciite za storage i fileFilter
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//! poedinecna slika
// exports.uploadFilmPhotos = upload.single("slika"); // req.file
//! povekje sliki
// exports.uploadFilmsSliki = upload.array("sliki", 3); // req.files

//! kombinacija od poedinecna slika i mnogu sliki
exports.uploadFilmsPhotos = upload.fields([
  { name: "slika", maxCount: 1 },
  { name: "sliki", maxCount: 3 },
]);

exports.update = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    // single slika
    if (req.file) {
      const filename = req.file.filename;
      req.body.slika = filename;
    }

    // povekje sliki
    if (req.files && req.files.sliki) {
      const filenames = req.files.sliki.map((file) => file.filename);
      req.body.sliki = filenames;
    }

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
