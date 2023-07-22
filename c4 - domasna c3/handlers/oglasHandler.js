const Oglas = require("../pkg/oglasi/oglasiSchema");

exports.createOglas = async (req, res) => {
  try {
    const newOglas = await Oglas.create(req.body);
    res.send(newOglas);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllOglasi = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const oglasi = await Oglas.find(query);
    res.send(oglasi);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllOglasByType = async (req, res) => {
  try {
    const { type } = req.params;
    // const type = req.params.type

    console.log(type);

    const queryObj = { ...req.query, type };
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const oglasi = await Oglas.find(query);
    res.send(oglasi);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateOglas = async (req, res) => {
  try {
    const updatedOglas = await Oglas.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedOglas);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteOglas = async (req, res) => {
  try {
    await Oglas.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
