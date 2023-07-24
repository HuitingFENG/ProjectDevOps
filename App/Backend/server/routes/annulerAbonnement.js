/**
 * Cette méthode définit la fin de l'abonnement en cours au dernier jours du mois actuel, ce qui a pour effet de mettre fin à l'abonnement de l'utilisateur
 * L'utilisateur connecté doit posséder l'abonnement passé en paramètre pour que le changement prenne effet (ne renvoie pas d'erreur si la condition n'est pas validée)
 *
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const today = new Date();
    const end_of_month = new Date(today.getFullYear(), today.getMonth()+1, 0) // On veut le dernier jour de ce mois-ci donc le jour 0 du mois prochain  : https://stackoverflow.com/a/13773408/13185397

    // On définit la date de fin au dernier jour du mois pour ne pas léser l'utilisateur qui a payé au début du mois pour un mois complet
    // On ne propose pas un remboursement au prorata ou une facturation en fin de mois qui ne couvre que ce qui a été consommé, ça fait plus d'argent
    database.query("UPDATE abonnement SET date_fin = ? WHERE id_client = ? AND id = ?", [end_of_month, req.session.userId, req.params['abonnementId']])

    res.status(200).json({});
}
