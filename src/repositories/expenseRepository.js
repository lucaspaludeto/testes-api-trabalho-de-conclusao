const expenses = [];

function addExpense(expense) {
	expenses.push(expense);
}

function getExpensesByUser(nome) {
	return expenses.filter(e => e.nome === nome);
}

module.exports = { addExpense, getExpensesByUser };
