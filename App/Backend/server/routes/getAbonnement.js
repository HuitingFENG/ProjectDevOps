/**
 * Retourne l'abonnement dont l'id correspond à celui passé en paramètre d'URL, s'il est possédé par l'utilisateur appelant la route
 * Les valeurs sont formattées pour l'affichage
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const [result] = await database.query(`SELECT id, 
                                                  id_client,
                                                  date_debut,
                                                  date_fin,
                                                  vcore_config.nombre as vcores, 
                                                  ram_config.affichage as ram, 
                                                  os_config.nom_systeme as os,
                                                  disque_config.affichage as disque, 
                                                  io_config.vitesse as bande_passante,
                                                  vcore_config.prix + ram_config.prix + disque_config.prix + io_config.prix + os_config.prix as prix
                                           FROM abonnement LEFT JOIN ram_config ON ram_config.quantite = abonnement.ram
                                                           LEFT JOIN vcore_config ON vcore_config.nombre = abonnement.vcores
                                                           LEFT JOIN disque_config ON disque_config.espace = abonnement.disque
                                                           LEFT JOIN io_config ON io_config.vitesse = abonnement.vitesse_io
                                                           LEFT JOIN os_config ON os_config.nom_systeme = abonnement.os
                                           WHERE id_client = ? AND id = ?;`, [req.session.userId, req.params['abonnementId']]);

    if(result[0]){
        res.status(200).json(result[0]);
    } else {
        res.status(404).json({message: "Pas d'abonnement trouvé"})
    }

}
