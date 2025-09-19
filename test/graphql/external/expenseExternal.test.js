const request = require('supertest');
const { expect } = require('chai');

describe('Post /expenses', () => {
    it.only('POST /expenses deve retornar 201 quando os dados são válidos', async () => {
        const respostaLogin = await request('http://localhost:4000/graphql')
            .post('')
            .send({
                query: `
                    mutation Mutation($nome: String!, $senha: String!) {
                        login(nome: $nome, senha: $senha) {
                            token
                        }
                    }
                `,
                variables: {
                    nome: 'lucas',
                    senha: '12345'
                }
            });

        const resposta = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', `Beaer ${respostaLogin.body.data.login.tokem}`)
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
});