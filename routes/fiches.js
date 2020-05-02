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
    //est ce que j'ai un paramètre?
    var texteRecherche = req.query.recherche;

    var filtreRecherche = {};

    if (texteRecherche) {
      texteRecherche = texteRecherche.replace(/ /gi, "|");
      texteRecherche = new RegExp(texteRecherche, "i");
      filtreRecherche = {
        $or: [{ titre: texteRecherche }, { description: texteRecherche }],
      };
      console.log(filtreRecherche);
    }

    fiches
      .find(
        filtreRecherche,
        "_id titre description image_url afficher_en_page_accueil groupe",
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

    // Insertion dans la collection fiches de la base MongoDB
    maFiche.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: "Bravo, la fiche  est maintenant stockée en base de données",
        id: maFiche.id,
      });
    });
  });

// route https://monurl/fiches:ficheid
router
  .route("/:fiche_id")

  .get(function (req, res) {
    fiches.findById(req.params.fiche_id, function (err, fiches) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(fiches);
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
          res.json(fiches);
        }
      }
    );
  });

// exporte le module routeur decrit dans ce fichier
module.exports = router;
