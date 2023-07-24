# ProgWebProjetM1
Enzo Filangi - S7

### Description du projet

Le sujet peut être trouvé à l'adresse [https://thomas-veillard.fr/front-end-web-development/project/](https://thomas-veillard.fr/front-end-web-development/project/)

Le thème est "VPS Builder".

### Installation du projet

0. Installer MySQL si ce n'est pas déjà fait
1. Créer une base de données MySQL dédiée au projet, et éventuellement un utilisateur
2. Exécuter le script `SQL/Database_creation.sql` dans MySQL
3. Se rendre dans le dossier `Backend/` et y créer un fichier `.env` correspondant à la syntaxe décrite ci-dessous
4. Toujours dans le dossier `Backend/`, exécuter la commande `npm install`
5. Se rendre dans le dossier `Frontend/` et exécuter la commande `npm install`

Syntaxe du fichier .env :
- SECRET=[random string]
- DB_PASSWORD=
- DB_USER=
- DB_HOST=
- DB_NAME=
- CORS_URL=http://localhost:4200

### Exécution du projet

1. Se rendre dans le dossier `Backend/` et exécuter la commande `npm start`
2. Se rendre dans le dossier `Frontend/` et exécuter la commande `ng serve`
3. Ouvrir le navigateur sur http://localhost:4200

### Utiliser le projet

Des identifiants par défaut sont disponibles :
enzo.filangi@efrei.net
password






---

# English version
### Installing the project

0. Install MySQL if not already done
1. Create a MySQL database for this project, and eventually a dedicated user too
2. Execute the script `SQL/Database_creation.sql` in MySQL
3. Go into `Backend/` and create a `.env` file with the syntax below
4. Still inside `Backend/`, execute the command `npm install`
5. Go into `Frontend/` and execute the command `npm install`

.env file syntax:
- SECRET=[random string]
- DB_PASSWORD=
- DB_USER=
- DB_HOST=
- DB_NAME=
- CORS_URL = http://localhost:4200

### Executing the project

1. Go into `Backend/` and execute the command `npm start`
2. Go into `Frontend/` and execute the command `ng serve`
3. Open a web browser at the URL http://localhost:4200
