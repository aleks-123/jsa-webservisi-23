//! npm install node-fetch = so node-fetch vrshime interakcija so drugi veb servisi
//! npm install express

const express = require("express");
const weather = require("./handlers/weather");

const app = express();

app.get("/api/v1/weather/:city", weather.getCity);

app.listen(10001, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log("service started successfully");
});
