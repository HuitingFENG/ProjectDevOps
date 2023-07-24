/**
 * Cette méthode renvoie la liste de toutes les options des composants, ainsi que les restrictions de chacun de ces composants, au format JSON
 *
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const [ram] = await database.query("SELECT * FROM ram_config;")
    const [vcore] = await database.query("SELECT * FROM vcore_config;")
    const [os] = await database.query("SELECT * FROM os_config;")
    const [disque] = await database.query("SELECT * FROM disque_config;")
    const [io] = await database.query("SELECT * FROM io_config;")

    res.status(200).json({ram, vcore, os, disque, io});
}
