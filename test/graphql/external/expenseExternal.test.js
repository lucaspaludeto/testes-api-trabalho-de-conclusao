const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Post /expenses', () => {

    before(async () => {
        const loginUser = require('../fixture/requisicoes/login/loginUser.json');
        const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(loginUser);
        
            token = respostaLogin.body.data.login.token
    });

    it('POST /expenses deve retornar 200 quando os dados são válidos', async () => {
        const createExpense = require("../fixture/requisicoes/expenses/createExpense.json");

        const respostaEsperada = require("../fixture/respostas/expenses/retorna200DadosValidos.json");

        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createExpense);

        expect(resposta.status).to.equal(200);      
        expect(resposta.body.data.createExpense).to.deep.equal(respostaEsperada.data.createExpense);
        
    });

    it('POST /expenses deve retornar 400 quando categoria não é informada', async () => {  
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation Mutation($categoria: String!, $descricao: String!, $preco: Float!) {
                        createExpense(categoria: $categoria, descricao: $descricao, preco: $preco) {
                            categoria
                            descricao
                            preco
                        }
                    }
                `,
                variables: {
                    descricao: 'Uber',
                    preco: 49.99
                }
            });

        expect(resposta.status).to.equal(400);    
        expect(resposta.body.errors[0].message).to.equal('Variable "$categoria" of required type "String!" was not provided.')
    });

});