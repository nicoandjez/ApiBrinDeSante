//NES Définition du model MongoDB d'une fiche

//NES mongoose permet de géner le schéma de la base.
const mongoose = require("mongoose");

//NES Schema (structure) correspondant à une fiche
var ficheSchema = new mongoose.Schema({
  titre: String
});

//je lie le modèle que je viens de créer à la collection Fiches
var Fiches = mongoose.model("fiches", ficheSchema);

//export du module pour l'utiliser.
module.exports = Fiches;
