/**
 * Retourne les formules marketing mises en avant
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const [formules] = await database.query(`SELECT nom_formule, 
                                                  description, 
                                                  vcore_config.nombre as vcores, 
                                                  ram_config.affichage as ram, 
                                                  disque_config.affichage as disque, 
                                                  io_config.vitesse as bande_passante,
                                                  vcore_config.prix + ram_config.prix + disque_config.prix + io_config.prix as prix
                                           FROM formule LEFT JOIN ram_config ON ram_config.quantite = formule.ram
                                                        LEFT JOIN vcore_config ON vcore_config.nombre = formule.vcores
                                                        LEFT JOIN disque_config ON disque_config.espace = formule.disque
                                                        LEFT JOIN io_config ON io_config.vitesse = formule.vitesse_io
                                           ORDER BY formule.display_order;`);

    res.status(200).json(formules)
}
