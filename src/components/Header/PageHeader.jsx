import { useNavigation } from "../../hooks/useNavigation";
import { ArrowLeft, House, User } from "phosphor-react";
import "./navbar.css";

export default function PageHeader() {
  const { goToDashboard, goToLogin, goBack, isHome, isLogin } = useNavigation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {!isHome && (
          <button className="nav-button back-button" onClick={goBack}>
            <ArrowLeft size={20} weight="bold" /> Voltar
          </button>
        )}
      </div>

      <div className="navbar-center">
        <h1 className="navbar-title">MEDICAPP</h1>
      </div>

      <div className="navbar-right">
        {!isHome && !isLogin && (
          <button className="nav-button" onClick={goToDashboard}>
            <House size={20} weight="bold" /> Início
          </button>
        )}
        <button className="login-button" onClick={goToLogin}>
          <User size={20} weight="bold" /> Login
        </button>
      </div>
    </nav>
  );
}
