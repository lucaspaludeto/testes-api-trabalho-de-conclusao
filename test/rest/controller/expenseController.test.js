const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../app');

const expenseService = require('../../../src/services/expenseService')

describe('Expense Controller', () => {
    describe('POST /expenses', () => {

        beforeEach(async () => {
            const respostaLogin = await request(app)
                .post('/login')
                .send({
                    nome: 'lucas',
                    senha: '12345'
                    });
                        
            token = respostaLogin.body.token;
        });
        
        it('POST /expenses deve retornar 201 quando os dados são válidos', async () => {                    
            
            const resposta = await request(app)
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    categoria: "transporte",
                    descricao: "Uber",
                    preco: 27.90 
                    });

                expect(resposta.status).to.equal(201);
        });

        it('POST /expenses deve retornar 400 quando categoria não é informada', async () => {
            const resposta = await request(app)
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    descricao: "Uber",
                    preco: 27.90 
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Campos obrigatórios não preenchidos');
        });

        it('POST /expenses deve retornar 400 quando descricao não é informado', async () => {
            const resposta = await request(app)
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    categoria: "Transporte",
                    preco: 27.90 
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Campos obrigatórios não preenchidos');
        });

        it('POST /expenses deve retornar 400 quando preco não é informado', async () => {
            const resposta = await request(app)
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    categoria: "Transporte",
                    descricao: "Trem"
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Campos obrigatórios não preenchidos');
        });

        it('POST /expenses deve retornar 400 quando preco é menor ou igual a ZERO', async () => {
            const resposta = await request(app)
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    categoria: "Transporte",
                    descricao: "Trem",
                    preco: 0
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Preço deve ser um número maior que zero');
        });





        it('Usando MOCK: Deve retornar 401 quando o token não é informado', async () => {

            const expenseServiceMock = sinon.stub(expenseService, 'createExpense');
            expenseServiceMock.throws(new Error('Token não fornecido'));

            const resposta = await request(app)
                .post('/expenses')
                .send({
                    categoria: "transporte",
                    descricao: "Uber",
                    preco: 27.90 
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');

            sinon.restore();
        });

    });
});