//NIE pour enregistrer les pages consultées et les appels
const logTraffic = require("../functions/LogTraffic");
const router = require("express").Router();

//NIE import du modèle mongo
const mongoose = require("mongoose");
let traffic = require("../models/traffic.model");

//NIE GET permet de récupérer les stats
router.get("/", function (req, res) {
  logTraffic("Site", "Stats /");

  traffic.aggregate(
    [
      { $match: { mois: 4, annee: 2020 } },
      { $sort: { nom_jour: 1 } },
      {
        $group: {
          _id: { nom_jour: "$nom_jour" },
          nom_jour: { $first: "$nom_jour" },
          page: { page_nom: "$page_nom" },
          nombre: { $sum: 1 },
        },
      },
    ],
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.get("/site", function (req, res) {
  logTraffic("Site", "Stats site");

  traffic.aggregate(
    [
      { $match: { annee: 2020, type: "Site" } },
      { $sort: { mois: 1, nom_jour: 1 } },
      {
        $group: {
          _id: { mois: "$mois", nom_jour: "$nom_jour" },
          nombre: { $sum: 1 },
        },
      },
    ],
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.get("/pages", function (req, res) {
  logTraffic("Site", "Stats pages");

  traffic.aggregate(
    [
      { $match: { annee: 2020, type: "Page" } },
      { $sort: { page_nom: 1 } },
      {
        $group: {
          _id: { page_nom: "$page_nom" },
          nombre: { $sum: 1 },
        },
      },
    ],
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

//NIE exporte le module routeur decrit dans ce fichier
module.exports = router;
