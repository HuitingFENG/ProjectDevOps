module.exports.createFormules = async function (db, formules = null) {
    const plans = formules || [
        ["Essentiel", 1, "Pour les petit budgets", 2, 512, 10, 100],
        ["Confort", 2, "Ne soyez plus limité dans vos projets", 4, 8192, 500, 300],
        ["Élite", 3, "Exploitez une énorme puissance de calcul", 16, 32768, 1000, 1000],
        ["Site web", 4, "Rendez votre site internet accessible à de nombreux utilisateurs", 4, 8192, 100, 1000],
        ["Archivage cloud", 5, "Stockez vos fichiers et rendez les accessibles partout", 2, 1024, 2000, 1000],
        ["Serveur Minecraft", 6, "C'est le mieux qu'on puisse vous offrir, et vous allez quand même réussir à le faire lagguer en installant trop de mods", 32, 65536, 2000, 1000]
    ]

    for (const plan of plans) {
        try {
            await db.query(
                'INSERT INTO formule(nom_formule, display_order, description, vcores, ram, disque, vitesse_io) VALUES(?,?,?,?,?,?,?)',
                plan
            )
        } catch (error) {
            console.error(error)
        }
    }
}
