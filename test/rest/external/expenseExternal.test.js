const request = require('supertest');
const { expect } = require('chai');


describe('Expense Controller', () => {
    describe('POST /expenses', () => {
        it('POST /expenses deve retornar 201 quando os dados são válidos', async () => {

            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    nome: 'lucas',
                    senha: '12345'
                });
            
            const token = respostaLogin.body.token;

            const resposta = await request('http://localhost:3000')
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    categoria: "transporte",
                    descricao: "Uber",
                    preco: 27.90 
                });

            expect(resposta.status).to.equal(201);
         //   expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });
        

    });
});