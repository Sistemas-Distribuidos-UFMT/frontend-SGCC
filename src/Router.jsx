import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/PageFooter";
import PageHeader from "./components/Header/PageHeader";
import AuthProvider from "./hooks/authContext";
import "./index.css";
import PrivateRoute from "./hooks/PrivateRoute";
import Login from "./pages/Login/Login";
import Agendamento from "./pages/Agendamento/Agendamento";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <PageHeader />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="inicio" element={<Dashboard />} />
                  <Route path="agendar/:medicoId" element={<Agendamento />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
