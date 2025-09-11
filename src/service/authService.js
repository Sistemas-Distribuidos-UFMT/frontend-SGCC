import api from "../hooks/api";

export const login = async (email, senha) => {
  console.log("data sent:", email, senha);
  const res = await api.post("/auth/login", { email, senha });
  const data = res.data;
  localStorage.setItem("tipoPessoa", data.tipoPessoa);
  localStorage.setItem("nome", data.nome);
};

export const logout = () => {
  try {
    api.post("/auth/logout");
    localStorage.removeItem("tipoPessoa");
    localStorage.removeItem("nome");
  } catch (e) {
    console.error("Logout error:", e);
  }
};

export const isAuthenticated = async () => {
  try {
    const res = await api.get("/pacientes/me");
    console.log("logado");
    return res.status === 200;
  } catch {
    return false;
  }
};
