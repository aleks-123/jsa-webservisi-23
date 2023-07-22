const express = require("express");
const db = require("./pkg/db/index");
const oglasHandler = require("./handlers/oglasHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

app.get("/oglas", oglasHandler.getAllOglasi);
app.get("/oglas/:type", oglasHandler.getAllOglasByType);
app.post("/oglas", oglasHandler.createOglas);
app.patch("/oglas/:id", oglasHandler.updateOglas);
app.delete("/oglas/:id", oglasHandler.deleteOglas);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
