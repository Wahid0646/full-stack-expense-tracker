const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

router.post('/', expenseController.createExpense);
router.get('/', expenseController.getExpenses);
router.delete('/expenses', expenseController.deleteExpense);

module.exports = router;
