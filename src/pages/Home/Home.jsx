  import "./home.css";
  import hero from "../../assets/img_01.jpg";
  import { useEffect, useState } from "react";
  import api from "../../hooks/api";

  const Home = () => {
    const [CRM, setCRM] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("paciente");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedEspecialidade, setSelectedEspecialidade] = useState(null);
    const [especialidades, setEspecialidades] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      console.log(
        "fields: ",
        `\n Nome Completo: ${fullName}`,
        `\n email: ${email}`,
        `\n role: ${role}`,
        `\n password: ${password}`,
        `\n birthdate: ${birthdate}`,
        `\n phoneNumber: ${phoneNumber}`,
        `\n selectedEspecialidade: ${selectedEspecialidade}`,
        `\n CRM: ${CRM}`
      );
    }, [
      CRM,
      email,
      role,
      fullName,
      password,
      birthdate,
      phoneNumber,
      selectedEspecialidade,
    ]);
    const handleEspecialidade = (value) => {
      setSelectedEspecialidade(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        if (role === "paciente") {
          const pacienteData = {
            nome: fullName,
            email,
            senha: password,
            dataNascimento: birthdate,
            telefone: phoneNumber,
          };
          console.log("paciente dados: ", pacienteData)
          const response = await api.post("/pacientes", pacienteData);
          console.log("Paciente cadastrado:", response.data);
          alert("Cadastro de paciente realizado com sucesso!");
        } else if (role === "medico") {
          const medicoData = {
            nome: fullName,
            email,
            senha: password,
            crm: CRM,
            codigoEspecialidade: selectedEspecialidade,
          };
          console.log("medico dados: ", medicoData)
          const response = await api.post("/medicos", medicoData);
          console.log("Médico cadastrado:", response.data);
          alert("Cadastro de médico realizado com sucesso!");
        }

        setFullName("");
        setEmail("");
        setPassword("");
        setBirthdate("");
        setPhoneNumber("");
        setCRM("");
        setSelectedEspecialidade("");
      } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro ao realizar cadastro. Verifique os campos e tente novamente.");
      }
    };

    const getEspecialidades = async () => {
      const response = await api.get("/medicos/especialidades");
      setEspecialidades(response.data);
    };

    useEffect(() => {
      getEspecialidades();
    }, [role]);

    const handlePhoneNumber = (e) => {
      let value = e.target.value;
      value = value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      setPhoneNumber(value);
    };

    const formatPhoneNumber = (value) => {
      if (!value) return value;
      value = value.replace(/\D/g, "");
      if (value.length <= 2) return `(${value}`;
      if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    };

    const changeRole = (newRole) => {
      if (newRole == role) return;
      if (newRole !== "paciente" && newRole !== "medico") return;
      setSelectedEspecialidade("");
      setCRM("");
      setRole(newRole);
    };

    return (
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-image-container">
            <img
              src={hero}
              alt="Médico atendendo paciente"
              className="hero-image"
            />
            <div className="hero-overlay">
              <div className="hero-content">
                <h1 className="hero-title">MEDICAPP SGCC</h1>
                <p className="hero-subtitle">
                  Sua plataforma completa para agendamento de consultas médicas
                </p>
                <a className="cta-button" href="#registration">
                  Começar Agora
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="benefits-section">
          <h2>Por que escolher o MEDICAPP?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Agendamento Simplificado</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eu ultricies lacinia.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Profissionais Qualificados</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eu ultricies lacinia.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Lembretes Automáticos</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eu ultricies lacinia.
              </p>
            </div>
          </div>
        </section>
        <section id="registration" className="registration-section">
          <h2>Junte-se à nossa comunidade</h2>
          <p className="section-description">
            Cadastre-se conforme seu perfil para começar a usar nossa plataforma
          </p>
          <div className="registration-container">
            <div className="user-type-selector">
              <button
                className={`user-type-btn  ${role === "paciente" && "active"}`}
                onClick={() => changeRole("paciente")}
              >
                Paciente
              </button>
              <button
                className={`user-type-btn ${role === "medico" && "active"}`}
                onClick={() => changeRole("medico")}
              >
                Médico
              </button>
            </div>
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  id="name"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">Senha</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Crie uma senha segura"
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>
              <div className="dynamic-fields patient-fields">
                <div className="form-group">
                  <label htmlFor="birthdate">Data de Nascimento</label>
                  <input
                    type="date"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone-number">Número de Telefone</label>
                  <input
                    type="text"
                    value={formatPhoneNumber(phoneNumber)}
                    onChange={handlePhoneNumber}
                    id="phone-number"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div
                className={`dynamic-fields doctor-fields ${
                  role === "medico" ? "" : "hidden"
                }`}
              >
                <div className="form-group">
                  <label htmlFor="crm">CRM</label>
                  <input
                    type="text"
                    value={CRM}
                    onChange={(e) => setCRM(e.target.value)}
                    id="crm"
                    placeholder="Número do seu registro profissional"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="specialty">Especialidade</label>
                  <select
                    id="specialty"
                    value={selectedEspecialidade}
                    onChange={(e) => handleEspecialidade(e.target.value)}
                  >
                    <option value="">Selecione uma especialidade</option>
                    {especialidades.map((esp) => (
                      <option
                        key={esp.codigo_especialidade}
                        value={esp.codigo_especialidade}
                      >
                        {esp.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-button">
                Criar Conta
              </button>
            </form>
            <p className="login-redirect">
              Já tem uma conta? <a href="/login">Faça login</a>
            </p>
          </div>
        </section>
        <section className="testimonials-section">
          <h2>O que nossos usuários dizem</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eu ultricies lacinia."
              </p>
              <div className="testimonial-author">
                <strong>Maria Silva</strong>
                <span>Paciente</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eu ultricies lacinia."
              </p>
              <div className="testimonial-author">
                <strong>Dr. João Santos</strong>
                <span>Cardiologista</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default Home;
