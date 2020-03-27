//Import du module Mongoose qui gère le lien avec la base MongoDB
const mongoose = require("mongoose");
//NIE on va se servir de express pour gérer le routage
const router = require("express").Router();
//NIE import du model fiche
let fiches = require("../models/fiches.model");
//NIE import du module permettant de traiter les paramètres
const bodyParser = require("body-parser");

//NIE route https://monurl/fiches
router
  .route("/")

  //NIE GET monurl/fiches retoune la liste des fiches.
  .get(function(req, res) {
    var reponseJson = "";

    fiches.find({}, "_id titre", function(err, fiches) {
      if (err) {
        res.send(err);
      }
      console.log(fiches);
      res.json(fiches);
    });
  })

  //NIE POST permet d'ajouter une fiche
  .post(function(req, res) {
    var maFiche = new fiches();
    console.log(req.body);
    maFiche.titre = req.body.titre;

    //Insertion dans la collection fiches de la base MongoDB
    maFiche.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: "Bravo, la fiche  est maintenant stockée en base de données",
        id: maFiche.id
      });
    });
  });

//NIE route https://monurl/fiches:ficheid
router
  .route("/:fiche_id")

  .get(function(req, res) {
    fiches.findById(req.params.fiche_id, function(err, fiches) {
      if (err) res.send(err);
      res.json(fiches);
    });
  });

// exporte le module routeur decrit dans ce fichier
module.exports = router;
