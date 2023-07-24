/**
 * Déconnecte l'utilisateur en supprimant sa session
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports = async (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({message: "ok"});
    });
}
