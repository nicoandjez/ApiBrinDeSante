//NIE pour enregistrer les pages consultées et les appels
const logTraffic = require("../functions/LogTraffic");

const router = require("express").Router();
//NIE import du model fiche
const mongoose = require("mongoose");
let param = require("../models/param.model");

//NIE POST permet de mettre à jour le paramétrage
router.post("/", function (req, res) {
  var query = {};
  var data = {
    texte_accueil: req.body.texte_accueil,
    texte_apropos: req.body.texte_apropos,
  };
  var options = { new: true, upsert: true };
  //NIE je cherche si il y a un paramétrage
  param.findOneAndUpdate(query, data, options, function (err, monParam) {
    if (err) {
      res.send(err);
    } else {
      //NIE mesure de l'ouverture de la page
      logTraffic("Site", "Modification du paramétrage");

      res.send(monParam);
    }
  });
});

//NIE GET permet de récupérer le paramétrage
router.get("/", function (req, res) {
  param.findOne({}, function (err, param) {
    if (err) {
      res.send(err);
    } else {
      //NIE mesure de l'ouverture de la page
      logTraffic("Site", "GET  paramétrage");
      res.send(param);
    }
  });
});

//NIE exporte le module routeur decrit dans ce fichier
module.exports = router;
