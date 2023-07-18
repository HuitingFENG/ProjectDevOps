module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Agences", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        city: {
            type: Sequelize.STRING,
        },
        geocalisation: {
            type: Sequelize.STRING,
        },
    });
};

// Définition de la table Agence.