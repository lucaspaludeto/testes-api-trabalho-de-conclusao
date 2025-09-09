const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

async function register({ nome, senha, salarioMensal }) {
	if (!nome || !senha || !salarioMensal) {
		throw new Error('Campos obrigatórios não preenchidos');
	}
	if (userRepository.findByName(nome)) {
		throw new Error('Usuário já existe');
	}
	const hashedPassword = await bcrypt.hash(senha, 8);
	const user = { nome, senha: hashedPassword, salarioMensal };
	userRepository.addUser(user);
	return { nome, salarioMensal };
}

async function login({ nome, senha }) {
	if (!nome || !senha) {
		throw new Error('Campos obrigatórios não preenchidos');
	}
	const user = userRepository.findByName(nome);
	if (!user) {
		throw new Error('Usuário não encontrado');
	}
	const valid = await bcrypt.compare(senha, user.senha);
	if (!valid) {
		throw new Error('Senha inválida');
	}
	const token = jwt.sign({ nome: user.nome }, SECRET, { expiresIn: '1h' });
	return { token };
}

module.exports = { register, login };
