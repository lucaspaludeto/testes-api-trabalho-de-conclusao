const users = [];

function findByName(nome) {
	return users.find(u => u.nome === nome);
}

function addUser(user) {
	users.push(user);
}

module.exports = { findByName, addUser };
