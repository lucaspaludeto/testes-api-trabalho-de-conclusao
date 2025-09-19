const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();

const app = express();
app.use(express.json());

// Middleware para extrair usuário do token JWT
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto');
      } catch (e) {
        req.user = null;
      }
    }
  }
  next();
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

async function startApollo() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}
startApollo();

module.exports = app;
