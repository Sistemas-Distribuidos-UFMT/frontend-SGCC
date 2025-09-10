import { useEffect, useState } from "react";
import "./dashboard.css";
import api from "../../hooks/api";

const Dashboard = () => {
  const [tipoPessoa, setTipoPessoa] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);



  const getEspecialidades = async () => {
    const response = await api.get("/medicos/especialidades");
    setEspecialidades(response.data);
  }; //vai servir como filtro de pesquisa, também terá pesquisa por nome

  const getMedics = async () => {
    const response = await api.get("/medicos");
    console.log(response.data);
    setMedicos(response.data);
  };

  const getConsultasMedic = async () => {
    const response = await api.get("/consultas"); 
    console.log(response.data);
    setConsultas(response.data)
  };
  const getConsultasClient = async () => {
    const response = await api.get("/pacientes/me/consultas");
    console.log("minhas consultas: ", response.data); 
    setConsultas(response.data)
  };

  useEffect(() => {
    let tipo = localStorage.getItem("tipoPessoa");

    if (tipo === "CLIENTE") {
      getEspecialidades();
      getMedics();
      getConsultasClient();
      } else if (tipo === "MEDICO") {
        getConsultasMedic();
      }
    
    setTipoPessoa(tipo);
  }, []);

  if (!tipoPessoa) return <div>Carregando...</div>;

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo(a) {tipoPessoa === "CLIENTE" ? "Paciente" : tipoPessoa === "MEDICO" ? "Médico" : "Gestor"}</h1>

      {tipoPessoa === "CLIENTE" && (
        <>
          <section className="medicos-section">
            <h2>Lista de Médicos</h2>
            <ul>
              {medicos.map((m) => (
                <li key={m.codigo_medico} className="card">
                  <strong>{m.pessoa.nome}</strong>
                  <p>{m.especialidade.nome}</p>
                  <button>Ver horários</button>
                  <button>Agendar consulta</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="consultas-section">
            <h2>Minhas Consultas</h2>
            <ul>
              {consultas.map((c) => (
                <li key={c.id} className="card">
                  <p>Medico: {c.medico}</p>
                  <p>Data: {c.data}</p>
                  <p>Status: {c.status}</p>
                  {c.status === "Futura" && <button>Cancelar</button>}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {tipoPessoa === "MEDICO" && (
        <section className="consultas-section">
          <h2>Minhas Consultas</h2>
          <ul>
            {consultas.map((c) => (
              <li key={c.id} className="card">
                <p>Paciente: {c.paciente}</p>
                <p>Data: {c.data}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
