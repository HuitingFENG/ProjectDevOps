module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Directions", {
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
// Définition de la table Direction.