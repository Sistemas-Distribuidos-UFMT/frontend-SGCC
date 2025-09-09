import "./notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Página não encontrada</p>
        <a href="/" className="notfound-link">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
