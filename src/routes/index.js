const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');
const authenticateToken = require('../middleware/jwtMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/expenses', authenticateToken, expenseController.createExpense);
router.get('/expenses', authenticateToken, expenseController.getExpenses);

module.exports = router;
