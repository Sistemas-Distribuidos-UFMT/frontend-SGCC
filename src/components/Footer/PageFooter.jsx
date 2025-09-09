import "./footer.css";

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>MEDICAPP</h3>
          <p>Conectando pacientes e profissionais de saúde</p>
        </div>
        <div className="footer-links">
          <a href="/inicio">Dashboard</a>
          <a href="/">Página inicial</a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2023 MEDICAPP. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
