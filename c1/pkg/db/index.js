const mongoose = require("mongoose");
const dotenv = require("dotenv");
//? So dotenv ja konfigurirame okolinata i vmetnuvame config.env da e del od process.env objektot
dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//? Kreiravme funkcija so koja funkcija kje e eksportirame i kje e povikame vo app.js
exports.init = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully coneted to DATABASE");
  } catch (err) {
    console.log(err);
  }
};
