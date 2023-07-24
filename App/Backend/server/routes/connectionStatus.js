/**
 * Cette méthode retourne "true" si l'utilisateur est connecté, "false" sinon.
 * Elle permet également de récupérer un token CSRF
 *
 * @param req
 * @param res
 */
module.exports = (req, res) => {
    if (req.session.userId) {
        res.json({connected: true});
    } else {
        res.json({connected: false});
    }
}
