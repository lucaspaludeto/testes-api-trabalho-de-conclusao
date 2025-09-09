const userService = require('../services/userService');

async function register(req, res) {
	try {
		const { nome, senha, salarioMensal } = req.body;
		const user = await userService.register({ nome, senha, salarioMensal });
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

async function login(req, res) {
	try {
		const { nome, senha } = req.body;
		const result = await userService.login({ nome, senha });
		res.json(result);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

module.exports = { register, login };
