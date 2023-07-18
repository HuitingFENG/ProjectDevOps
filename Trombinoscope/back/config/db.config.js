module.exports = {
  HOST: process.env.MYSQL_HOST_IP,
  PORT: 3306,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// Configuration de la connexion à la database. Tout est stockée dans des variables pour protéger les informations sensibles.