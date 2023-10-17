const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define('expense', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Expense;
