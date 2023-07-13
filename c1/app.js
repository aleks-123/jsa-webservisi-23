//! SOAP i REST apinja
//! SOAP - XML za transfer
//! REST - XML i JSON za transfer
//! APIs - Application Programming interace
//! REST - Representational state tranfer
//! NPM INSTALL DOTENV

//! process.env e mesto kade sto nashata aplikacija zivee(okolina)

//? gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");

//? inicijazilirame aplikacija
const app = express();

//? povikuvame middelwari
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

//? slusame aplikacija
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
