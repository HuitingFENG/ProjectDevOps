/**
 * Ce middleware permet de protéger les routes sensibles en n'autaurisant leur accès qu'aux utilisateurs authentifiés
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    if(req.session.userId){
        next();
    } else {
        res.sendStatus(401);
    }
}
