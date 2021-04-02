//NES Définition du model MongoDB du paramétrage

//NES mongoose permet de géner le schéma de la base.
const mongoose = require("mongoose");

//NES Schema (structure) correspondant à une image
var ParametrageSchema = new mongoose.Schema({
  texte_accueil: String,
  texte_apropos: String,
  email_contact: String,
  mot_de_passe: String,
});

//je lie le modèle que je viens de créer à la collection Fiches
var Param = mongoose.model("parametrage", ParametrageSchema);

//export du module pour l'utiliser.
module.exports = Param;
