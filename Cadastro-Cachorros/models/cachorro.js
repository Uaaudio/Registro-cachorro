
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Cachorro = sequelize.define('cachorro', {
  nome: DataTypes.STRING,
  raca: DataTypes.STRING,
  idade: DataTypes.INTEGER,
  peso: DataTypes.FLOAT  // Aqui estava o erro
});

module.exports = Cachorro;