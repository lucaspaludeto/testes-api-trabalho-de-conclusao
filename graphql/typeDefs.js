const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    nome: String!
    salarioMensal: Float!
  }

  type Expense {
    nome: String!
    categoria: String!
    descricao: String!
    preco: Float!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    expenses: [Expense!]!
    users: [User!]!
  }

  type Mutation {
    register(nome: String!, senha: String!, salarioMensal: Float!): User!
    login(nome: String!, senha: String!): AuthPayload!
    createExpense(categoria: String!, descricao: String!, preco: Float!): Expense!
  }
`;
