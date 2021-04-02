//NES mongoose permet de géner le schéma de la base.
const mongoose = require("mongoose");

//NES Schema (structure) correspondant à une fiche
var ficheSchema = new mongoose.Schema({
  titre: String,
  titre_fiche: String,
  description: String,
  date_modif: Date,
  symptomes: String,
  conseils: String,
  aller_chez_le_medecin: String,
  articles: [{ titre: String, texte: String, ordre: Number }],
  image_url: String,
  afficher_en_page_accueil: Boolean,
  groupe: String,
  is_masque: Boolean,
  afficher_nouvelle_fiche: Boolean,
  appeler_le_15: String,
});

//je lie le modèle que je viens de créer à la collection Fiches
var Fiches = mongoose.model("fiches", ficheSchema);

//export du module pour l'utiliser.
module.exports = Fiches;
