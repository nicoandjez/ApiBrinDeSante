//NES Définition du model MongoDB du suivi des corrections

//NES mongoose permet de géner le schéma de la base.
const mongoose = require("mongoose");

//NES Schema (structure) correspondant à une image
var CorrectionsSchema = new mongoose.Schema({
  titre: String,
  description: String,
  commentaire: String,
  etat: String,
  date_creation: Date,
  date_resolution: Date,
  date_reouverture: Date,
  commentaire_reouverture: String,
});

//je lie le modèle que je viens de créer à la collection Fiches
var Corrections = mongoose.model("corrections", CorrectionsSchema);

//export du module pour l'utiliser.
module.exports = Corrections;
