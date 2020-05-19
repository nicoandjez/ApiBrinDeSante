//NIE pour enregistrer les pages consultées et les appels
const logTraffic = require("../functions/LogTraffic");

//Import du module Mongoose qui gère le lien avec la base MongoDB
const mongoose = require("mongoose");
//NIE on va se servir de express pour gérer le routage
const router = require("express").Router();
//NIE import du model fiche
let corrections = require("../models/corrections.model");
//NIE import du module permettant de traiter les paramètres
const bodyParser = require("body-parser");

//NIE route https://monurl/corrections
router
  .route("/")

  //NIE GET monurl/fiches retoune la liste des fiches.
  .get(function (req, res) {
    //NIE mesure de l'ouverture de la page
    logTraffic("Site", "Liste des corrections");

    var filtreRecherche = {};

    corrections
      .find(filtreRecherche, function (err, corrections) {
        if (err) {
          res.send(err);
        }
        res.json(corrections);
      })
      .sort({ date_creation: -1 });
  })

  //NIE POST permet d'ajouter une correction
  .post(function (req, res) {
    var maCorrection = new corrections();
    maCorrection.titre = req.body.titre;
    maCorrection.description = req.body.description;
    maCorrection.commentaire = req.body.commentaire;
    maCorrection.etat = req.body.etat;
    maCorrection.date_creation = new Date();
    maCorrection.date_resolution = req.body.date_resolution;
    maCorrection.date_reouverture = req.body.date_reouverture;
    maCorrection.commentaire_reouverture = req.body.commentaire_reouverture;
    // Insertion dans la collection corrections de la base MongoDB
    maCorrection.save(function (err) {
      if (err) {
        res.send(err);
      }
      //NIE mesure de l'ouverture de la page
      logTraffic("Site", "Création d'une correction");
      res.send({
        message:
          "Bravo, la correction  est maintenant stockée en base de données",
        id: maCorrection.id,
      });
    });
  });

//NIE route https://monurl/fiches:ficheid
router
  .route("/:correction_id")

  .patch(function (req, res) {
    var data = {
      titre: req.body.titre,
      description: req.body.description,
      commentaire: req.body.commentaire,
      etat: req.body.etat,
      date_resolution: req.body.date_resolution,
      date_reouverture: req.body.date_reouverture,
      commentaire_reouverture: req.body.commentaire_reouverture,
    };

    corrections.findByIdAndUpdate(
      req.params.correction_id,
      data,
      { new: true },
      function (err, correction) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          //NIE mesure de l'ouverture de la page
          logTraffic("Site", "Mise à jour d'une correction");
          res.json(correction);
        }
      }
    );
  });

// exporte le module routeur decrit dans ce fichier
module.exports = router;
