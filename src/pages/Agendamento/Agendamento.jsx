import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../hooks/api";
import "./agendamento.css";

const Agendamento = () => {
  const { medicoId } = useParams();
  const [data, setData] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [medico, setMedico] = useState(null);

  const buscarHorarios = async () => {
    setLoading(true);
    try {
      console.log(
        "Buscando horários para médico: ",
        `/consultas/horarios-disponiveis?data=${data}`
      );
      const response = await api.get(
        `/consultas/horarios-disponiveis?data=${data}`
      );
      console.log("resposta: ", response.data);
      const filtrados = response.data.filter((h) => h.medicoId === medicoId);
      setHorarios(filtrados);

      if (filtrados.length > 0) {
        setMedico({
          nome: filtrados[0].nomeMedico,
          especialidade: filtrados[0].especialidade,
        });
      }
    } catch (err) {
      console.error("Erro ao buscar horários:", err);
    } finally {
      setLoading(false);
    }
  };

  const agendarConsulta = async (horario) => {
    try {
      const paciente = await api.get("/pacientes/me");
      const codigo_paciente = paciente.data.codigo_pessoa;
      const dataHora = `${data}T${horario}`;

      console.log("Agendando consulta:", {
        pacienteId: codigo_paciente,
        medicoId: medicoId,
        data: dataHora,
      });

      const consulta = await api.post("/consultas", {
        pacienteId: codigo_paciente,
        medicoId: medicoId,
        data: dataHora,
      });
      alert("Consulta agendada com sucesso!");
      console.log(consulta.data.situacao);
      buscarHorarios();
    } catch (err) {
      alert("Erro ao agendar consulta.");
      console.error(err);
    }
  };

  useEffect(() => {
    buscarHorarios();
  }, [data]);

  return (
    <div className="agendamento-container">
      <h1>Agendar Consulta</h1>

      {medico && (
        <p>
          Médico: <strong>{medico.nome}</strong> ({medico.especialidade})
        </p>
      )}

      <div className="filtro-data">
        <label>Selecione a data</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Carregando horários...</p>
      ) : horarios.length > 0 ? (
        <div className="lista-horarios">
          {horarios.map((h, index) => (
            <button
              key={index}
              className="horario-btn"
              onClick={() => agendarConsulta(h.horario)}
            >
              {h.horario}
            </button>
          ))}
        </div>
      ) : (
        <p>Nenhum horário disponível.</p>
      )}
    </div>
  );
};

export default Agendamento;
