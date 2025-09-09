import { createContext, useState, useEffect } from "react";
import { isAuthenticated, logout } from "../service/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  const handleLogin = () => setAuth(true);
  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
