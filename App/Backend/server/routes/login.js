const bcrypt = require('bcrypt');

/**
 * Authentifie l'utilisateur en vérifiant que l'email et le mot de passe soient bien valides
 *
 * Paramètres du body :
 *      username - le nom d'utilisateur (adresse email)
 *      password - le mot de passe en clair de l'utilisateur
 *
 * 400 = mauvais mot de passe/username (inclus le cas où ils sont absents)
 * 401 = déjà connecté
 * 403 = mauvais CSRF (pas contrôlé par cette méthode)
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

    // On récupère les informations du body
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).json({message: "bad request - request must include username and password"});
        return;
    }


    // On vérifie que le mot de passe est correct
    const sql = "SELECT * FROM compte WHERE email=?";
    const result = (await database.query(sql, username))[0];
    if (result.length === 1) {
        if (await bcrypt.compare(password, result[0].password)) {
            req.session.userId = result[0].id;
            res.status(200).json({message: "ok"})
            return;
        }
    }

    // On ne fait pas de différence entre un mauvais mot de passe et un mauvais nom d'utilisateur pour ne pas donner d'informations à un potentiel attaquant
    res.status(400).json({});
}
