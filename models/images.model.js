//NES Définition du model MongoDB d'une image

//NES mongoose permet de géner le schéma de la base.
const mongoose = require("mongoose");

//NES Schema (structure) correspondant à une image
var ImageSchema = new mongoose.Schema({
  nom: String,
  url: String,
  data: Buffer,
  content_type: String,
});

//je lie le modèle que je viens de créer à la collection Fiches
var Images = mongoose.model("images", ImageSchema);

//export du module pour l'utiliser.
module.exports = Images;
