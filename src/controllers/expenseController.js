const expenseService = require('../services/expenseService');

function createExpense(req, res) {
	try {
		const { categoria, descricao, preco } = req.body;
		const nome = req.user.nome;
		const precoNum = typeof preco === 'string' ? parseFloat(preco) : preco;
		const expense = expenseService.createExpense({ nome, categoria, descricao, preco: precoNum });
		res.status(201).json(expense);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

function getExpenses(req, res) {
	try {
		const nome = req.user.nome;
		const expenses = expenseService.getExpenses(nome);
		res.json(expenses);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

module.exports = { createExpense, getExpenses };
