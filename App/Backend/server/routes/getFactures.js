/**
 * Cette route renvoie toutes les factures appartenant à l'utilisateur connecté
 *
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const [result] = await database.query(`SELECT facture.id as id_facture,
                                                  abonnement.id as id_abonnement,
                                                  date_facture,
                                                  montant
                                           FROM facture LEFT JOIN abonnement ON abonnement.id = facture.id_abonnement
                                           WHERE id_client = ?;`, req.session.userId);

    res.status(200).json(result);
}
