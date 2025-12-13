# testes-api-trabalho-de-conclusao


AP
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

# Conceitos de Performance Aplicados no Projeto

Esta seção detalha onde e como cada conceito de performance foi aplicado nos testes automatizados com K6 neste projeto.

## Thresholds
O código abaixo está armazenado no arquivo `test/k6/create-expense.js` e demonstra o uso do conceito **Thresholds**.

```javascript
export const options = {
  thresholds: {
    http_req_duration: ["p(95)<300"],
  },
  stages: [
    { duration: '3s', target: 10 },
    { duration: '15s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};
```
Thresholds definem limites de desempenho esperados para as métricas do teste. No exemplo acima, o percentil 95 da duração das requisições HTTP deve ser menor que 300ms.

## Checks
O código abaixo está armazenado no arquivo `test/k6/helpers/registerUser.js` e demonstra o uso do conceito **Checks**.

```javascript
check(registerRes, {
  "Register user status code 201": (r) => r.status === 201,
});
```
Checks são asserções que validam se a resposta da requisição atende a critérios de sucesso, como o status code esperado.

## Helpers
O código abaixo está armazenado no arquivo `test/k6/helpers/registerUser.js` e demonstra o uso do conceito **Helpers**.

```javascript
export function registerUser(user, baseUrl) {
  const registerRes = http.post(`${baseUrl}/register`, JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
  check(registerRes, {
    "Register user status code 201": (r) => r.status === 201,
  });
}
```
Helpers são funções utilitárias criadas para reaproveitar lógica comum entre diferentes scripts de teste, promovendo organização e reutilização de código.

## Trends
O código abaixo está armazenado no arquivo `test/k6/create-expense.js` e demonstra o uso do conceito **Trends**.

```javascript
import { Trend } from "k6/metrics";
const postCreateExpenseDurationTrend = new Trend('post_create_expense_duration');
```
Trends são métricas customizadas que permitem monitorar e analisar a duração de operações específicas ao longo do teste.

O código abaixo está armazenado no arquivo `test/k6/helpers/registerExpense.js` e também demonstra o uso de **Trends**:

```javascript
trend.add(createExpenseRes.timings.duration);
```
Aqui, a duração de cada requisição de criação de despesa é adicionada à métrica customizada para análise posterior.

## Faker
O código abaixo está armazenado no arquivo `test/k6/create-expense.js` e demonstra o uso do conceito **Faker**.

```javascript
import faker from "k6/x/faker";
let user = {
  nome: faker.person.firstName() + " " + faker.person.lastName(),
  senha: faker.internet.password(),
  salarioMensal: faker.numbers.number(1200, 9999999),
};
```
Faker é utilizado para gerar dados aleatórios e realistas para os testes, garantindo unicidade e variabilidade dos usuários criados.

## Variável de Ambiente
O código abaixo está armazenado no arquivo `test/k6/helpers/getBaseUrl.js` e demonstra o uso do conceito **Variável de Ambiente**.

```javascript
export function getBaseUrl() {
    return __ENV.BASE_URL || 'http://localhost:3000';
}
```
O uso de variáveis de ambiente permite parametrizar a base URL dos testes sem alterar o código-fonte, facilitando a execução em diferentes ambientes.

## Stages
O código abaixo está armazenado no arquivo `test/k6/create-expense.js` e demonstra o uso do conceito **Stages**.

```javascript
export const options = {
  stages: [
    { duration: '3s', target: 10 },
    { duration: '15s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};
```
Stages definem a variação do número de usuários virtuais (VUs) ao longo do tempo, simulando ramp-up, carga constante e ramp-down.

## Reaproveitamento de Resposta
O código abaixo está armazenado no arquivo `test/k6/helpers/loginUser.js` e demonstra o uso do conceito **Reaproveitamento de Resposta**.

```javascript
return loginRes.json("token");
```
O token de autenticação retornado no login é reaproveitado em requisições subsequentes, como o registro de despesas.

## Uso de Token de Autenticação
O código abaixo está armazenado no arquivo `test/k6/helpers/registerExpense.js` e demonstra o uso do conceito **Uso de Token de Autenticação**.

```javascript
headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
```
O token JWT obtido no login é utilizado no header Authorization para autenticar requisições protegidas.

## Data-Driven Testing
O código abaixo está armazenado no arquivo `test/k6/create-expense.js` e demonstra o uso do conceito **Data-Driven Testing**.

```javascript
import { SharedArray } from "k6/data";
const expenses = new SharedArray("expenses", function () {
  return JSON.parse(open("./data/expense.test.data.json"));
});
```
Data-Driven Testing é realizado ao carregar dados de despesas de um arquivo externo, permitindo a execução de testes com múltiplos cenários e entradas.

## Groups
O código abaixo está armazenado no arquivo `test/k6/create-expense.js` e demonstra o uso do conceito **Groups**.

```javascript
group("Registrar novo usuário", function () {
  registerUser(user, BASE_URL);
});
group("Login do usuário", function () {
  token = loginUser(user, BASE_URL);
});
group("Registrar gasto", function () {
  registerExpense(BASE_URL, expenses, token, postCreateExpenseDurationTrend);
});
```
Groups organizam o teste em blocos lógicos, facilitando a leitura dos resultados e a identificação de gargalos em etapas específicas do fluxo.
