//NIE pour le stockage en base
const mongoose = require("mongoose");
let traffic = require("../models/traffic.model");

function LogTraffic(type, nomPage, idPage) {
  var dateCourante = new Date();
  var jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  var monTraffic = new traffic();
  monTraffic.page_nom = nomPage;
  monTraffic.page_id = idPage;
  monTraffic.type = type;
  monTraffic.date = dateCourante;
  monTraffic.annee = dateCourante.getFullYear();
  monTraffic.mois = dateCourante.getMonth();
  monTraffic.num_jour = dateCourante.getDay();
  monTraffic.nom_jour = jours[dateCourante.getDay()];
  //NIE +2 dans notre fuseau horaire
  monTraffic.heure = dateCourante.getUTCHours() + 2;

  //console.log(monTraffic);

  monTraffic.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = LogTraffic;
