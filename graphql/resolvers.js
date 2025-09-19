const userService = require('../src/services/userService');
const expenseService = require('../src/services/expenseService');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    expenses: (parent, args, context) => {
      if (!context.user) throw new Error('Não autenticado');
      return expenseService.getExpenses(context.user.nome);
    },
    users: () => userService.getAllUsers ? userService.getAllUsers() : [],
  },
  Mutation: {
    register: async (parent, { nome, senha, salarioMensal }) => {
      return userService.register({ nome, senha, salarioMensal });
    },
    login: async (parent, { nome, senha }) => {
      return userService.login({ nome, senha });
    },
    createExpense: (parent, { categoria, descricao, preco }, context) => {
      if (!context.user) throw new Error('Não autenticado');
      return expenseService.createExpense({ nome: context.user.nome, categoria, descricao, preco });
    }
  }
};
