const request = require('supertest');
const { expect } = require('chai');


describe('Expense Controller', () => {
    describe('POST /expenses', () => {

        beforeEach(async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    nome: 'lucas',
                    senha: '12345'
                });
            
            token = respostaLogin.body.token;
        });

        it('POST /expenses deve retornar 201 quando os dados são válidos', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    categoria: "Alimentação",
                    descricao: "Lanche McDonald's",
                    preco: 83.99 
                });

            expect(resposta.status).to.equal(201);
            const respostaEsperada = require('../fixture/respostas/deveRetornar201QuandoOsDadosSaoValidos.json');
            expect(resposta.body).to.deep.equal(respostaEsperada)
        });
        
        
        it('POST /expenses deve retornar 400 quando categoria não é informada', async () => {
            const resposta = await request('http://localhost:3000')
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
            const resposta = await request('http://localhost:3000')
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
            const resposta = await request('http://localhost:3000')
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
            const resposta = await request('http://localhost:3000')
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

        it('POST /expenses deve retornar 401 quando o token não é informado', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/expenses')
                .send({
                    categoria: "Alimentação",
                    descricao: "Lanche McDonald's",
                    preco: 83.99 
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });

        it('POST /expenses deve retornar 403 quando o token é inválido', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/expenses')
                .set('Authorization', 'Bearer tokenInválido')
                .send({
                    categoria: "Alimentação",
                    descricao: "Lanche McDonald's",
                    preco: 83.99 
                });

            expect(resposta.status).to.equal(403);
            expect(resposta.body).to.have.property('message', 'Token inválido');
        });
    });

    describe('GET /expenses', () => {
        beforeEach(async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    nome: 'lucas',
                    senha: '12345'
                });
            
            token = respostaLogin.body.token;
        });

         it('GET /expenses deve retornar 200 e uma lista de despesas', async () => {
            const resposta = await request('http://localhost:3000')
                .get('/expenses')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
            const respostaEsperada = require('../fixture/respostas/deveRetornar200EUmaListaDeDespesas.json');
            expect(resposta.body).to.be.an('array').that.is.not.empty;
            expect(resposta.body[0]).to.deep.equal(respostaEsperada[0]);
        });

        it('GET /expenses deve retornar 401 quando o token não é informado', async () => {
            const resposta = await request('http://localhost:3000')
                .get('/expenses');

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });

        it('GET /expenses deve retornar 403 quando o token é inválido', async () => {
            const resposta = await request('http://localhost:3000')
                .get('/expenses')
                .set('Authorization', 'Bearer tokenInvalido')

            expect(resposta.status).to.equal(403);
            expect(resposta.body).to.have.property('message', 'Token inválido');
        });
    })
});