import api from "../hooks/api";

export const login = async (email, senha) => {
  console.log("data sent:", email, senha);
  const res = await api.post("/auth/login", { email, senha });
  const data = res.data;
  localStorage.setItem("tipoPessoa", data.tipoPessoa);
  localStorage.setItem("nome", data.nome);
};

export const logout = () => {
  localStorage.removeItem("tipoPessoa");
  localStorage.removeItem("nome");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
