/**
 * Cette route renvoie le détail d'une facture
 * La facture doit appartenir à l'utilisateur connecté
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
                                                  montant,
                                                  vcore_config.nombre as vcores, 
                                                  ram_config.affichage as ram, 
                                                  disque_config.affichage as disque, 
                                                  io_config.vitesse as bande_passante,
                                                  os_config.nom_systeme as os,
                                                  vcore_config.prix as vcores_prix, 
                                                  ram_config.prix as ram_prix, 
                                                  disque_config.prix as disque_prix, 
                                                  io_config.prix as io_prix,
                                                  os_config.prix as os_prix
                                           FROM facture LEFT JOIN abonnement ON abonnement.id = facture.id_abonnement
                                                        LEFT JOIN ram_config ON ram_config.quantite = abonnement.ram
                                                        LEFT JOIN vcore_config ON vcore_config.nombre = abonnement.vcores
                                                        LEFT JOIN disque_config ON disque_config.espace = abonnement.disque
                                                        LEFT JOIN io_config ON io_config.vitesse = abonnement.vitesse_io
                                                        LEFT JOIN os_config ON os_config.nom_systeme = abonnement.os
                                           WHERE facture.id = ? AND id_client = ?;`, [req.params['factureId'], req.session.userId]);

    if(result[0]){
        res.status(200).json(result[0]); // On renvoie le premier item de la liste puisqu'on est censé n'obtenir qu'une seule facture
    } else {
        res.status(404).json({message: "Pas de facture trouvée"});
    }

}
