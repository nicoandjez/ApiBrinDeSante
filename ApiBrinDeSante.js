const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
//Problème de cross domain Access-Control-Allow-Origin
var cors = require("cors");
app.use(cors());

//NES je récupère les constantes du fichier de configuration
require("dotenv").config();
const hostname = process.env.HOST;
const port = process.env.PORT;
const uriMongo = process.env.URIMONGO;

//NES Nous définissons ici les paramètres du serveur express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//NES Options de connexion à la base
const optionsMongo = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

//NES Connexion à la base de donnée
mongoose
  .connect(uriMongo, optionsMongo)
  .then(() => {
    console.log("Connectée à la base BrinDeSante");
  })
  .catch((e) => {
    console.log("Erreur de connexion à la base : " + e);
  });

//définition de la route principale de l'API BrinDeSanté
var myRouterMenu = express.Router();

//description du routeur, .all valable pour tous les types de passages POST, GET, PUT....
myRouterMenu.route("/").all(function (req, res) {
  var message = "<h1>Bienvenue sur notre  API  Brin de santé</h1><br>";
  res.send(message);
});

// Nous demandons à l'application d'utiliser le routeur ci dessus
app.use(myRouterMenu);

//On importe le module gérant les routes correspondantes à /fiches/
const fichesRouter = require("./routes/fiches");
app.use("/fiches", fichesRouter);

//On importe le module gérant les routes correspondantes à /images/
const imagesRouter = require("./routes/images");
app.use("/images", imagesRouter);

//On importe le module gérant les routes correspondantes à /param/
const paramRouter = require("./routes/param");
app.use("/param", paramRouter);

//Route pour les stats
const statsRouter = require("./routes/stats");
app.use("/stats", statsRouter);

//Route pour les corrections
const correctionsRouter = require("./routes/corrections");
app.use("/corrections", correctionsRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(
    `API BrinDeSante demarre sur le serveur:  ${hostname} et port: ${port}`
  );
});
