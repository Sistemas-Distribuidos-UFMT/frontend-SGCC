import { useContext } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { ArrowLeft, House, User } from "phosphor-react";
import "./navbar.css";
import { AuthContext } from "../../hooks/authContext";

export default function PageHeader() {
  const { auth, handleLogout } = useContext(AuthContext);
  const {
    goToDashboard,
    goToLogin,
    goBack,
    isHome,
    isLogin,
    isDashboard,
    goToHome,
  } = useNavigation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {!isHome && !isDashboard && (
          <button className="nav-button back-button" onClick={goBack}>
            <ArrowLeft size={20} weight="bold" /> Voltar
          </button>
        )}
      </div>

      <div className="navbar-center">
        <h1 className="navbar-title" onClick={goToHome}>
          MEDICAPP
        </h1>
      </div>

      <div className="navbar-right">
        {auth && !isDashboard && !isLogin && (
          <button className="nav-button" onClick={goToDashboard}>
            <House size={20} weight="bold" /> Início
          </button>
        )}
        {!auth && (
          <button className="login-button" onClick={goToLogin}>
            <User size={20} weight="bold" /> Login
          </button>
        )}
        {auth && (
          <button className="login-button" onClick={handleLogout}>
            <User size={20} weight="bold" /> Sair
          </button>
        )}
      </div>
    </nav>
  );
}
