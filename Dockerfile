#NIE Je pars d'une image docker node en version 10
FROM node:12.2.0-alpine

#Repertoire de mon application
WORKDIR /app

#NIE permet de copier les 2 fichiers package.json  et package-lock.json
COPY package*.json ./

#NIE Installation de toutes les dépendances
RUN npm install

#NIE Copie du code source dans le docker
COPY . .

#NIE je le mets sur le port 5000 (que l'on peut changer au lancement de l'image docker)
EXPOSE 5000

#NIE commande pour lancer mon API node.js
CMD [ "node", "ApiBrinDeSante.js" ]
