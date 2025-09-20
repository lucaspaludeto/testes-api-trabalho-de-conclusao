const request = require('supertest');
const { expect } = require('chai');

describe('Post /expenses', () => {

    before(async () => {
        const loginUser = require('../fixture/login/loginUser.json')
        const respostaLogin = await request('http://localhost:4000/graphql')
            .post('')
            .send(loginUser);
        
            token = respostaLogin.body.data.login.token
    });

    it('POST /expenses deve retornar 201 quando os dados são válidos', async () => {
        const resposta = await request('http://localhost:4000/graphql')
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
                    categoria: 'Transporte',
                    descricao: 'Uber',
                    preco: 49.99
                }
            });

        expect(resposta.status).to.equal(200);      
    });

    it('POST /expenses deve retornar 400 quando categoria não é informada', async () => {  
        const resposta = await request('http://localhost:4000/graphql')
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