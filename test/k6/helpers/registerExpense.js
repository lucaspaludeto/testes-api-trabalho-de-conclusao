import http from "k6/http";
import { check } from "k6";

export function registerExpense(baseUrl, expenses, token, trend) {
  expenses.forEach((expense) => {
    const createExpenseRes = http.post(`${baseUrl}/expenses`, JSON.stringify(expense), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    check(createExpenseRes, {
      "Expense status code 201": (r) => r.status === 201,
    });
    
    trend.add(createExpenseRes.timings.duration);
  });
}