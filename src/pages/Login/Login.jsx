import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/authContext";
import { isAuthenticated } from "../../service/authService";
import { login } from "../../service/authService";
import "./login.css";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, senha);
      handleLogin();
      navigate("/inicio");
    } catch (err) {
      setError("Usuário ou senha inválidos");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      if (auth) {
        navigate("/inicio");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu email"
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
