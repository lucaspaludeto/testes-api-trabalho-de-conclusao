import http from "k6/http";
import { check, group, sleep } from "k6";
import { Trend } from "k6/metrics";
import { getBaseUrl } from "./helpers/getBaseUrl.js";
import { registerUser } from "./helpers/registerUser.js";
import { loginUser } from "./helpers/loginUser.js";
import { registerExpense } from "./helpers/registerExpense.js";
import { SharedArray } from "k6/data";
import faker from "k6/x/faker";

const postCreateExpenseDurationTrend = new Trend('post_create_expense_duration');

const expenses = new SharedArray("expenses", function () {
  return JSON.parse(open("./data/expense.test.data.json"));
});

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<300"],
  },
  stages: [
    { duration: '5s', target: 10 },
    { duration: '15s', target: 20 },
    { duration: '5s', target: 0 },
  ],
};

const BASE_URL = getBaseUrl();

export default function () {
  let user = {
    nome: faker.person.firstName() + " " + faker.person.lastName(),
    senha: faker.internet.password(),
    salarioMensal: faker.numbers.number(1200, 9999999),
  };

  let token = "";

  group("Registrar novo usuário", function () {
    registerUser(user, BASE_URL);
  });

  group("Login do usuário", function () {
    token = loginUser(user, BASE_URL);
  });

  group("Registrar gasto", function () {
    registerExpense(BASE_URL, expenses, token, postCreateExpenseDurationTrend);
  });

  sleep(1);
}
