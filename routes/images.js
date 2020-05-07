//NIE pour enregistrer les pages consultées et les appels
const logTraffic = require("../functions/LogTraffic");

const router = require("express").Router();
const fs = require("fs");
//NIE import du model fiche
const mongoose = require("mongoose");
let images = require("../models/images.model");

//NIE on va se servir de multer  pour gérer la récupération des images et gridfs pour les mettre directement dans MONGO
const multer = require("multer");
//NIE paramètre de multer on peut y passer un répertoire pour stocker en local, ici j'y passe mon bind MOngo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//NIE POST permet d'ajouter une image
//NIE j'ajoute le middleware upload qui vient avec multer (.single = un fichier)
router.post("/", upload.single("image_file"), function (req, res) {
  //NIE mesure de l'ouverture de la page
  logTraffic("Site", "Ajout d'une image");

  const monImage = new images({
    _id: new mongoose.Types.ObjectId(),
    nom: req.file.originalname,
    url: "/images/" + req.file.originalname,
    content_type: req.file.mimetype,
    data: fs.readFileSync(req.file.path),
  });

  monImage.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.send({
      message: "Bravo, l'image  est maintenant stockée en base de données",
      id: monImage.id,
      url: monImage.url,
    });
  });
});

//NIE GET permet de récupérer les images
router.get("/", function (req, res) {
  const filtreRecherche = {};

  images.find(filtreRecherche, "_id nom url", function (err, images) {
    if (err) {
      res.send(err);
    } else {
      //NIE mesure de l'ouverture de la page
      logTraffic("Site", "Get images");
      res.send(images);
    }
  });
});

//NIE GET permet de récupérer les informations d'une image
router.get("/:image_id/info", function (req, res) {
  images.findById(req.params.image_id, function (err, images) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(images);
    }
  });
});

//NIE GET permet de récupérer une image
router.get("/:nom_image", function (req, res) {
  images.findOne({ nom: req.params.nom_image }, function (err, images) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      if (images) {
        //NIE mesure de l'ouverture de la page
        logTraffic("Site", images.nom);
        res.writeHead(200, { "Content-Type": images.content_type });
        res.end(images.data);
      } else {
        res.send();
      }
    }
  });
});

//NIE exporte le module routeur decrit dans ce fichier
module.exports = router;
