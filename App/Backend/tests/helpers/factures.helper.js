module.exports.createFactures = async function (db, factures) {
    for (const facture of factures) {
        await db.query(
            'INSERT INTO facture(id_abonnement, date_facture, montant) VALUES(?,?,?)',
            facture
        )
    }
}
