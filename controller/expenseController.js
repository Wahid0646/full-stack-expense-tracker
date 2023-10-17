const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newExpense = await Expense.create({ description, amount });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.destroy({ where: { id } });
    if (deletedExpense) {
      res.status(200).json({ message: 'Expense deleted successfully' });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
