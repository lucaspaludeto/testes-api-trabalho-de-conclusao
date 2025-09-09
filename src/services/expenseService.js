const expenseRepository = require('../repositories/expenseRepository');

function createExpense({ nome, categoria, descricao, preco }) {
	if (!categoria || !descricao || preco === undefined) {
		throw new Error('Campos obrigatórios não preenchidos');
	}
	if (typeof preco !== 'number' || preco <= 0) {
		throw new Error('Preço deve ser um número maior que zero');
	}
	const expense = { nome, categoria, descricao, preco };
	expenseRepository.addExpense(expense);
	return expense;
}

function getExpenses(nome) {
	return expenseRepository.getExpensesByUser(nome);
}

module.exports = { createExpense, getExpenses };
