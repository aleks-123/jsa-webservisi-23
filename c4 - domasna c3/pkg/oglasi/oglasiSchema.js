const mongoose = require("mongoose");

const oglasiShema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["avtomobili", "nedviznini", "telefoni", "velosipedi"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  kvadatria: {
    type: Number,
  },
  pominatiKilotetri: {
    type: Number,
  },
});

const Oglas = mongoose.model("Entity", oglasiShema);

module.exports = Oglas;
