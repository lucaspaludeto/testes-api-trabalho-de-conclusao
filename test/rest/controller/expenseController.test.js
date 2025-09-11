const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../app');

describe('Expense Controller', () => {
    describe('POST /expenses', () => {
        it('Deve retornar 401 quando o token não é informado', async () => {
            const resposta = await request(app)
                .post('/expenses')
                .send({
                   categoria: "transporte",
                   descricao: "Uber",
                   preco: 27.90 
                 });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });
    });
});