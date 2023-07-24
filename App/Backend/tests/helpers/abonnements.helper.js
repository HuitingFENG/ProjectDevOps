module.exports.createAbonnements = async function (db, email, abonnements = null) {
    const { id: userId } = (await db.query('select id from compte where email = ?', [email]))[0][0]

    const subscriptions = abonnements || [
        [userId, "2021-06-10", "2021-08-31", 8, 16384, "Ubuntu", 500, 300],
        [userId, "2021-09-01", null, 16, 32768, "Debian 10", 500, 1000]
    ]

    for (const subscription of subscriptions) {
        await db.query(
            'INSERT INTO abonnement(id_client, date_debut, date_fin, vcores, ram, os, disque, vitesse_io) VALUES (?,?,?,?,?,?,?,?)',
            subscription
        )
    }
}