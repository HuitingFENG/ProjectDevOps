/**
 * Ajoute un abonnement à l'utilisateur, d'après les paramètres passés en body
 *
 * Paramètres du body :
 *      vcores - Le nombre de coeurs virtuels
 *      ram - La quantité de ram
 *      os - Le système d'exploitation
 *      disque - L'espace disque
 *      vitesse_io - La bande passante
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const client = req.session.userId;
    try {
        // On n'utilise pas la déstructuration d'objet à cause des conversions de type qu'on doit effectuer
        const vcores = parseInt(req.body.vcores);
        const ram = parseInt(req.body.ram);
        const os = req.body.os;
        const disque = parseInt(req.body.disque);
        const vitesse_io = parseInt(req.body.vitesse_io);

        // On vérifie que toutes les propriétés sont là
        if (!vcores || !ram || !os || !disque || !vitesse_io){
            res.status(400).json({message: "Missing properties"});
            return;
        }

        // On valide les contraintes
        const vcore_constraints = (await database.query("SELECT min_ram, max_ram FROM vcore_config WHERE nombre = ?", parseInt(vcores)))[0][0];
        const os_constraints = (await database.query("SELECT min_ram FROM os_config WHERE nom_systeme = ?", os))[0][0];
        if (ram < vcore_constraints.min_ram || vcore_constraints.max_ram < ram || ram < os_constraints.min_ram){
            res.status(400).json({message: "Invalid constraints"});
            return;
        }

        // On insère l'abonnement dans la base de données
        await database.query("INSERT INTO abonnement(id_client, date_debut, date_fin, vcores, ram, os, disque, vitesse_io) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
            client,
            new Date(),
            null, // Par défaut, il n'y a pas de date de fin puisque l'abonnement est automatiquement renouvellé
            vcores,
            ram,
            os,
            disque,
            vitesse_io
        ])
        res.status(200).json({message: "ok"});

    } catch (e) {
        // Dans le cas où on reçoit quelque chose qui n'est pas un int en entrée, ou une valeur qui n'est pas dans la base de données
        res.status(400).json({message: "Invalid properties"});
    }
}
