import http from "k6/http";
import { check } from "k6";

export function loginUser(user, baseUrl) {
  const loginRes = http.post(
    `${baseUrl}/login`,
    JSON.stringify({
      nome: user.nome,
      senha: user.senha,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(loginRes, {
    "Login status code 200": (r) => r.status === 200,
  });
  
  return loginRes.json("token");
}
