import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../routes";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
  };

  const isDashboard = location.pathname === "/inicio";
  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  return {
    goToDashboard: () => goTo(routes.dashboard),
    goToHome: () => goTo(routes.home),
    goToLogin: () => goTo(routes.login),
    goToAbout: () => goTo(routes.about),
    goToContact: () => goTo(routes.contact),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    isDashboard,
    isHome,
    isLogin,
    currentPath: location.pathname,
  };
};
