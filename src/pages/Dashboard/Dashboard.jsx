import { useEffect, useState } from "react";
import "./dashboard.css";
import api from "../../hooks/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tipoPessoa, setTipoPessoa] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");

  const cancelarBtn = async (codigo_consulta) => {
    const confirm = window.confirm(
      "Tem certeza que deseja cancelar esta consulta?"
    );
    if (confirm) {
      try {
        await api.put(`/consultas/${codigo_consulta}/cancelar`, {
          codigo_consulta,
        });
        alert("Consulta cancelada com sucesso!");
        await getConsultasClient();
      } catch (err) {
        alert("Erro ao cancelar consulta.");
        console.error(err);
      }
    }
  };

  const medicosFiltrados = [...medicos].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    if (filtroNome) {
      if (a.pessoa.nome.toLowerCase().includes(filtroNome.toLowerCase()))
        scoreA++;
      if (b.pessoa.nome.toLowerCase().includes(filtroNome.toLowerCase()))
        scoreB++;
    }

    if (filtroEspecialidade) {
      if (a.especialidade.nome === filtroEspecialidade) scoreA++;
      if (b.especialidade.nome === filtroEspecialidade) scoreB++;
    }

    return scoreB - scoreA; // maior score vem primeiro
  });

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
    console.log("consultas medico: ", response.data);
    setConsultas(response.data);
  };
  const getConsultasClient = async () => {
    const response = await api.get("/pacientes/me/consultas");
    console.log("minhas consultas: ", response.data);
    setConsultas(response.data);
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
      <h1>Bem-vindo(a) {tipoPessoa === "CLIENTE" && "Paciente"}</h1>

      {tipoPessoa === "CLIENTE" && (
        <>
          <section className="medicos-section">
            <div className="filtros">
              <input
                type="text"
                placeholder="Buscar por nome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
              <select
                value={filtroEspecialidade}
                onChange={(e) => setFiltroEspecialidade(e.target.value)}
              >
                <option value="">Todas as especialidades</option>
                {especialidades.map((esp) => (
                  <option key={esp.codigo_especialidade} value={esp.nome}>
                    {esp.nome}
                  </option>
                ))}
              </select>
            </div>
            <h2>Lista de Médicos</h2>
            <ul>
              {medicosFiltrados.map((m) => (
                <li key={m.codigo_medico} className="card">
                  <strong>{m.pessoa.nome}</strong>
                  <p>{m.especialidade.nome}</p>
                  <button
                    onClick={() => navigate(`/agendar/${m.codigo_medico}`)}
                  >
                    Ver horários
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="consultas-section">
            <h2>Minhas Consultas</h2>
            <ul>
              {!consultas.length && <p>Nenhuma Consulta encontrada</p>}
              {consultas.map((c) => (
                <li key={c.id} className="card">
                  <p>Medico: {c.pessoa.nome}</p>
                  <p>Data: {c.data}</p>
                  <p>Status: {c.situacao}</p>
                  {c.situacao === "AGENDADA" && (
                    <button onClick={() => cancelarBtn(c.codigo_consulta)}>
                      Cancelar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
