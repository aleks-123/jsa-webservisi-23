//! SOAP i REST apinja
//! SOAP - XML za transfer
//! REST - XML i JSON za transfer
//! APIs - Application Programming interace
//! REST - Representational state tranfer
//! NPM INSTALL DOTENV

//! process.env e mesto kade sto nashata aplikacija zivee(okolina)

//! JWT - JSON WEB TOKEN
//* sekogash e statless
//! Logiranje - koga korinsikot se logira, serverot proveruva akdreditacija i generira json web token
//! Avtorizacija - odkoga korisnikot vekje se logiral aplikacijata mu go vrakja nazad tokenot pak do korisnikot vo forma na kukis ili korisnikot go zacuvuva voforma na lokalen storage
//! Verifikacija - koga korisnikot ima rikvest kon serverot so jwt tokenot, serverot prvbo go verifikuva ptopisot od tokenot potoa serverot proveruva dali korisnikot ima dozvola da ja zemi povratnata usluga od rikvestot ili pobaruvanjeto znaci ako potpisot e validen togas korisnikot uspesno ja dobiva uslugata od rikvestot

/////////////////////////////

//* JWT ima tri dela
//-header = cuva informacii za algoritmot koj e upotreben za da se logirame
//-payload = zacuvuvame podatoci od korisnikot i koga e izdaden
//-signature = koj go socinuva hashiraniot heder i payload i e potpisan so taen kluc koj sto go znae samo serverot

//? gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");
// npm install express-jwt
// so ovaj paket implementirame protekcija
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const movies = require("./handlers/movies");
const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");

//? inicijazilirame aplikacija
const app = express();

//? povikuvame middelwari
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? ovaj paket se grizi za parsiranjeto na cookies
app.use(cookieParser());
// specificirame direktorija publik za da imame pristap za fajlovi od fronted
// static metodot ni ovozmozuva da opsluzuvame staticni fajlovi
app.use(express.static("public"));

//? izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

// req.headers.authorization.split(" ")[1]; 5rasdgasdgasdgasdgasdgsgdasdg

// req.cookies = {
//   jwt: "5rasdgasdgasdgasdgasdgsgdasdg",
// };

// ovde koristime middelwarot sto ni ovozmuzva da gi protektirame rutite, kako prv parametar imame jwt.expressjwt , vnatre go stavame algoritmot za hashiranje i tajnaata poraka. i so pomosh na ovaj middelware gi protektirame site ruti osven onie ruti koi se vo unless metodata
app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null; // vo slucaj ako nemame isprateno token
      },
    })
    .unless({
      // osven ovie ruti
      path: ["/api/v1/signup", "/api/v1/login", "/login"],
    })
);

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.get("/movies", movies.getAll);
app.get("/movies/:id", movies.getOne);
app.post("/movies", movies.create);
app.put("/movies/:id", movies.replace);
app.patch("/movies/:id", movies.update);
app.delete("/movies/:id", movies.delete);

// view ruti
app.get("/viewMovies", viewHandler.movieView);
app.get("/login", viewHandler.getLoginForm);
app.post("/createMovie", viewHandler.createMovie);

//? slusame aplikacija
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});

//? DA SE KE KREIRA WEB SERVIS ILI REST API
//? DA SE KREIRA OGLAS
//? KAKO REKLAMA5
//? I DA SE KREIRA AFTENTIKACIJA (korisnici - logirtanje)
//? DA IMAME KOLEKCIJA SO AVTOMOBILI, VELOSIPEDI, NEDVIZNINI, TELEFONI
//? SITE KORISNICI BEZ RAZLIKA NA LOGIRANJE DA IMMAT PRISTAP DO SITE KOLEKCII
//? SAMO LOGIRANI KORISNI DA MOZE DA KREIRAAT BRISHAT I UPDEJTIRAAT DOKUMENTI VO KOLKECIITE
