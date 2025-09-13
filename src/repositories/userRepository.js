
const bcrypt = require('bcryptjs');

// Função para garantir que o hash é sempre gerado corretamente ao iniciar o servidor
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
