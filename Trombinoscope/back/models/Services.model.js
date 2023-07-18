module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Services_Activites", {
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
// Définition de la table Services_Activites.