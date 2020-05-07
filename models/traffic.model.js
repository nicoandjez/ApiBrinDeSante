//NIE Définition du model MongoDB du traffic
//NIE mongoose permet de géner le schéma de la base.
const mongoose = require("mongoose");

//NIE Schema (structure) pour stocker le traffic
var TrafficSchema = new mongoose.Schema({
  page_nom: String,
  page_id: String,
  type: String,
  date: Date,
  annee: Number,
  mois: Number,
  num_jour: Number,
  nom_jour: String,
  heure: Number,
});

//je lie le modèle que je viens de créer à la collection Fiches
var Traffic = mongoose.model("Traffic", TrafficSchema);

//export du module pour l'utiliser.
module.exports = Traffic;
