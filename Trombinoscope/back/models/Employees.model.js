module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Employees", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        mobilefixe: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        active: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        
    });
};
// Définition de la table Employees.