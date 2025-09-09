import api from "../hooks/api";

export const login = async (email, password) => {
  console.log("data sent:", email, password);
  const res = await api.post("/auth/login", { email, password });
  const { token } = res.data;
  localStorage.setItem("token", token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
