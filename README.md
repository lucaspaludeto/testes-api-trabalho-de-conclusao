
# testes-api-trabalho-de-conclusao


API REST e GraphQL para registro, login e controle de gastos, com autenticação JWT e banco em memória.


## Instalação

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:
	```bash
	npm install
	# Para GraphQL:
	npm install apollo-server-express@3 express@4 graphql jsonwebtoken bcryptjs dotenv
	```


## Execução


### Para rodar a API REST:
```bash
npm start
```
O servidor REST estará disponível em `http://localhost:3000`.

### Para rodar a API GraphQL:
```bash
cd graphql
node server.js
```
O servidor GraphQL estará disponível em `http://localhost:4000/graphql`.
## API GraphQL

### Exemplo de Query (listar despesas do usuário autenticado)
```graphql
query {
	expenses {
		nome
		categoria
		descricao
		preco
	}
}
```

### Exemplo de Mutation (registro, login, criar gasto)
```graphql
mutation {
	register(nome: "usuario", senha: "senha123", salarioMensal: 5000) {
		nome
		salarioMensal
	}
	login(nome: "usuario", senha: "senha123") {
		token
	}
	createExpense(categoria: "Alimentação", descricao: "Almoço", preco: 30.5) {
		nome
		categoria
		descricao
		preco
	}
}
```

### Mutation protegida por JWT (exemplo de transferência)
```graphql
mutation {
	createTransfer(valor: 100, destino: "joao")
}
```
> Para mutations protegidas, envie o token JWT no header `Authorization: Bearer <token>`

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

- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- O JWT pode ser customizado via variável de ambiente `JWT_SECRET`.

## Observações
- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- O JWT pode ser customizado via variável de ambiente `JWT_SECRET`.
- A API GraphQL está em `/graphql` e requer token JWT para mutations protegidas.
- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- O JWT pode ser customizado via variável de ambiente `JWT_SECRET`.
