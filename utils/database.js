const Sequelize = require('sequelize');

const sequelize = new Sequelize('yy', 'root', 'Wahid@0646', {
  host: 'localhost',
  dialect: 'mysql', // You can change this to your preferred database dialect
});

module.exports = sequelize;
