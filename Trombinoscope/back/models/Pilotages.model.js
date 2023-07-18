module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Pilotages", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
    });
};
// Définition de la table Pilotages.