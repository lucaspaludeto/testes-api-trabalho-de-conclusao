
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/swagger.json');
const routes = require('./src/routes');
const userRepository = require('./src/repositories/userRepository');

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

// Healthcheck
app.get('/health', (req, res) => res.send('ok'));

// Endpoint para resetar usuários em memória durante testes (opcional)
if (process.env.NODE_ENV === 'test') {
	app.post('/reset-users', (req, res) => {
		userRepository.resetUsers();
		res.status(204).send();
	});
}

module.exports = app;
