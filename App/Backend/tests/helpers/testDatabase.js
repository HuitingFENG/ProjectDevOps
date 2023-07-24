const mysql = require("mysql2/promise")

module.exports.testDatabase = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    dateStrings : true
});

module.exports.setupTestDatabase = async function(db) {
    // clean the db
    await db.execute(`DELETE FROM formule`);
    await db.execute(`DELETE FROM facture`);
    await db.execute(`DELETE FROM abonnement`);
    await db.execute(`DELETE FROM io_config`);
    await db.execute(`DELETE FROM disque_config`);
    await db.execute(`DELETE FROM os_config`);
    await db.execute(`DELETE FROM vcore_config`);
    await db.execute(`DELETE FROM ram_config`);
    await db.execute(`DELETE FROM compte`);
}
