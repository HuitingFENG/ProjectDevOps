const express = require('express')
const router = express.Router()
const mysql = require("mysql2/promise")

const dotenv = require('dotenv')
dotenv.config()

const environment = process.env.NODE_ENV;
console.log(`NODE_ENV=${environment}`);
const dbNameKey = `${environment === 'test' ? 'TEST_' : ''}DB_NAME`;

const database = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env[dbNameKey],
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    dateStrings: true
});

/*
 Méthodes de l'API
*/

const login = require('./routes/login');
const register = require('./routes/register');
const disconnect = require('./routes/disconnect')
const connectionStatus = require('./routes/connectionStatus')
const getAllComponentOptions = require('./routes/getAllComponentOptions');
const getAllFormules = require('./routes/getAllFormules');
const addAbonnement = require('./routes/addAbonnement');
const getAllAbonnements = require('./routes/getAbonnements');
const getAbonnement = require('./routes/getAbonnement');
const annulerAbonnement = require('./routes/annulerAbonnement');
const getAllFactures = require('./routes/getFactures');
const getFacture = require('./routes/getFacture');
const downloadFacture = require('./routes/downloadFacture');


/*
 Middlewares
 */
const checkIfConnected = require('./middlewares/checkIfConnected.js');

/*
 Liaison des méthodes aux routes
 */
// On doit utiliser la syntaxe () => methode() pour les méthodes qui utilisent l'objet 'database', mais on peut se contenter de passer la référence à la méthode pour celles qui ne se servent que des objets express.js
// GET
router.get("/connection_status", connectionStatus);
router.get("/component_options", async (req, res) => getAllComponentOptions(req, res, database));
router.get("/formules", async (req, res) => getAllFormules(req, res, database));
router.get("/abonnements", checkIfConnected, async (req, res) => getAllAbonnements(req, res, database));
router.get("/abonnement/:abonnementId", checkIfConnected, async (req, res) => getAbonnement(req, res, database));
router.get("/factures", checkIfConnected, async (req, res) => getAllFactures(req, res, database));
router.get("/facture/:factureId", checkIfConnected, async (req, res) => getFacture(req, res, database));
router.get("/download_facture/:factureId", checkIfConnected, async (req, res) => downloadFacture(req, res, database));

// POST
router.post("/login", async (req, res) => login(req, res, database));
router.post("/register", async (req, res) => register(req, res, database));
router.post("/disconnect", checkIfConnected, disconnect);
router.post("/abonnement", checkIfConnected, async (req, res) => addAbonnement(req, res, database));

// DELETE
router.delete("/abonnement/:abonnementId", checkIfConnected, async (req, res) => annulerAbonnement(req, res, database));

module.exports = router;
