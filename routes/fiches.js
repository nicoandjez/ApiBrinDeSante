//NIE pour enregistrer les pages consultées et les appels
const logTraffic = require("../functions/LogTraffic");

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
  .get(function (req, res) {
    //NIE mesure de l'ouverture de la page
    logTraffic("Site", "Liste des fiches");
    //est ce que j'ai un paramètre sur les fiches masquée?
    var is_masque = req.query.is_masque;

    var filtreRecherche = {
      is_masque: { $ne: true },
    };

    if (is_masque === "all") {
      //texteRecherche = texteRecherche.replace(/ /gi, "|");
      //texteRecherche = new RegExp(texteRecherche, "i");
      filtreRecherche = {};
      console.log(filtreRecherche);
    }

    fiches
      .find(
        filtreRecherche,
        "_id titre titre_fiche description image_url afficher_en_page_accueil groupe is_masque ",
        function (err, fiches) {
          if (err) {
            res.send(err);
          }
          res.json(fiches);
        }
      )
      .sort({ titre: 1 });
  })

  //NIE POST permet d'ajouter une fiche
  .post(function (req, res) {
    var maFiche = new fiches();
    maFiche.titre = req.body.titre;
    maFiche.titre_fiche = req.body.titre_fiche;
    maFiche.description = req.body.description;
    maFiche.date_modif = new Date();
    maFiche.symptomes = req.body.symptomes;
    maFiche.conseils = req.body.conseils;
    maFiche.aller_chez_le_medecin = req.body.aller_chez_le_medecin;
    maFiche.articles = req.body.articles;
    maFiche.image_url = req.body.image_url;
    maFiche.afficher_en_page_accueil = req.body.afficher_en_page_accueil;
    maFiche.groupe = req.body.groupe;
    maFiche.is_masque = req.body.is_masque;

    // Insertion dans la collection fiches de la base MongoDB
    maFiche.save(function (err) {
      if (err) {
        res.send(err);
      }
      //NIE mesure de l'ouverture de la page
      logTraffic("Site", "Création d'une fiche");
      res.send({
        message: "Bravo, la fiche  est maintenant stockée en base de données",
        id: maFiche.id,
      });
    });
  });

//NIE route https://monurl/fiches:ficheid
router
  .route("/:fiche_id")

  .get(function (req, res) {
    fiches.findById(req.params.fiche_id, function (err, fiche) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        //NIE mesure de l'ouverture de la page
        logTraffic("Page", fiche.titre, fiche._id);
        res.json(fiche);
      }
    });
  })

  .patch(function (req, res) {
    var data = {
      titre: req.body.titre,
      titre_fiche: req.body.titre_fiche,
      description: req.body.description,
      date_modif: new Date(),
      symptomes: req.body.symptomes,
      conseils: req.body.conseils,
      aller_chez_le_medecin: req.body.aller_chez_le_medecin,
      articles: req.body.articles,
      image_url: req.body.image_url,
      afficher_en_page_accueil: req.body.afficher_en_page_accueil,
      groupe: req.body.groupe,
      is_masque: req.body.is_masque,
    };

    fiches.findByIdAndUpdate(
      req.params.fiche_id,
      data,
      { new: true },
      function (err, fiches) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          //NIE mesure de l'ouverture de la page
          logTraffic("Site", "Mise à jour d'une fiche");
          res.json(fiches);
        }
      }
    );
  });

// exporte le module routeur decrit dans ce fichier
module.exports = router;
