
# testes-api-trabalho-de-conclusao

API REST para registro, login e controle de gastos, com autenticação JWT e banco em memória.

## Instalação

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:
	 ```bash
	 npm install
	 ```

## Execução

Para rodar o servidor:
```bash
npm start
```
O servidor estará disponível em `http://localhost:3000`.

## Endpoints REST

### Registro de usuário
`POST /register`
```json
{
	"nome": "usuario",
	"senha": "senha123",
	"salarioMensal": 5000
}
```

### Login
`POST /login`
```json
{
	"nome": "usuario",
	"senha": "senha123"
}
```
Retorna `{ "token": "..." }`

### Registrar gasto
`POST /expenses` (requer JWT no header Authorization)
```json
{
	"categoria": "Alimentação",
	"descricao": "Almoço",
	"preco": 30.5
}
```

### Listar gastos
`GET /expenses` (requer JWT)

## Documentação Swagger
Acesse em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Testes Automatizados

Para rodar os testes (após criar a pasta `test/` e adicionar os testes):
```bash
npm test
```

## Observações
- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- O JWT pode ser customizado via variável de ambiente `JWT_SECRET`.
