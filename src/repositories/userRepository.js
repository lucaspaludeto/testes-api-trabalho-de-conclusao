
const bcrypt = require('bcryptjs');

function getDefaultUsers() {
	return [
		{
			nome: 'lucas',
			senha: bcrypt.hashSync('12345', 8),
			salarioMensal: 10000
		}
	];
}

const users = getDefaultUsers();

function findByName(nome) {
	return users.find(u => u.nome === nome);
}

function addUser(user) {
	users.push(user);
}

function resetUsers() {
	users.length = 0;
	getDefaultUsers().forEach(u => users.push(u));
}

module.exports = { findByName, addUser, resetUsers };
