import http from "k6/http";
import { check } from "k6";

export function registerUser(user, baseUrl) {
  const registerRes = http.post(`${baseUrl}/register`, JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
  
  check(registerRes, {
    "Register user status code 201": (r) => r.status === 201,
  });
}