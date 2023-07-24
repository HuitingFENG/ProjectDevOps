const bcrypt = require('bcrypt');

/**
 * Inscrit l'utilisateur à partir des données passées en paramètres
 * Renvoie une erreur si l'utilisateur existe déjà
 *
 * Paramètres du body :
 *      nom - le nom de l'utilisateur
 *      prenom - le prénom de l'utilisateur
 *      email - l'adresse email de l'utilisateur, qui sera aussi son identifiant de connexion
 *      password - le mot de passe en clair de l'utilisateur
 *
 * 400 = Mauvaises données
 * 401 = Déjà connecté
 * 403 = Mauvais token CSRF (pas contrôlé par cette méthode)
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    // On vérifie si l'utilisateur est déjà connecté
    if (req.session.userId){
        res.status(401).json({message: "Already connected"});
        return;
    }

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    // Dans une vraie application on communiquerait avec le client en HTTPS, et on prendrait bien soin de ne logger le body nulle part, on peut donc recevoir le mot de passe en clair sans crainte vis à vis de la sécurité
    const password = req.body.password;

    // On vérifie la présence de toutes les propriétés
    if(!nom || !prenom || !email || !password){
        res.status(400).json({message: "Missing properties"});
        return;
    }

    const sql_select = "SELECT * FROM compte WHERE email=?";
    const result = (await database.query(sql_select, email))[0];

    // Vérification de l'unicité de l'utilisateur
    if (result.length > 0) {
        /* Dans un vrai site, on renverrais la même réponse que si l'inscription avait réussi (dans le style de "nous avons envoyé un mail de vérification, allez cliquer sur le lien dedans").
           Mais en vérité on enverrais un mail qui dirait "Attention quelqu'un a essayé de créer un compte avec votre email".
           Cela permettrait :
                  1. D'éviter qu'on puisse savoir si un utilisateur a déjà un compte sur notre site juste à partir de son mail (pas grave pour un VPS, mais plus problématique sur des sites "sensibles") ;
                  2. D'avertir le vrai utilisateur que quelqu'un a essayé son mail. Si c'est lui, alors il sait qu'il a déjà un compte (il avait peut-être oublié). Si ce n'est pas lui, il peut agir avec cette information.
        */
        res.status(400).json({message: "bad request - user already exists"});
        return;
    }

    // Génération du hash
    const hash = await bcrypt.hash(password, 10);

    // Insertion dans la base de données
    const sql_insert = "INSERT INTO compte (nom, prenom, email, password) VALUES (?, ?, ?, ?)";
    await database.query(sql_insert, [nom, prenom, email, hash]);

    // On authentifie l'utilisateur après l'inscription
    // Dans un véritable site, on enverrais ici un email pour vérifier le compte et on éviterais de connecter l'utilisateur tant qu'on a pas vérifié qu'il avait bien le contrôle du mail utilisé etc
    req.session.userId = (await database.query("SELECT LAST_INSERT_ID() AS id;"))[0][0]['id'];

    // Message de succès
    res.status(200).json({message: "ok"});
}
