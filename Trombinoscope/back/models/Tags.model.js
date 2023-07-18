module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Tag", {
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
// Définition de la table Tag.