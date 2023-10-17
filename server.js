const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./utils/database');
const Expense = require('./models/Expense');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/expenses', async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newExpense = await Expense.create({ description, amount });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Expense.destroy({ where: { id } });
    if (deletedRows > 0) {
      res.status(200).json({ message: 'Expense deleted successfully' });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.log(err));
