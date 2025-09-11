import "./home.css";
import hero from "../../assets/img_01.jpg";
import { useEffect, useState } from "react";
import api from "../../hooks/api";

const Home = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(
      "Campos preenchidos:",
      `\n Nome Completo: ${fullName}`,
      `\n Email: ${email}`,
      `\n Senha: ${password}`,
      `\n Data de Nascimento: ${birthdate}`,
      `\n Telefone: ${phoneNumber}`
    );
  }, [fullName, email, password, birthdate, phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const pacienteData = {
        nome: fullName,
        email,
        senha: password,
        dataNascimento: birthdate,
        telefone: phoneNumber,
      };

      console.log("Dados do paciente:", pacienteData);
      const response = await api.post("/pacientes", pacienteData);
      console.log("Paciente cadastrado:", response.data);
      alert("Cadastro de paciente realizado com sucesso!");

      setFullName("");
      setEmail("");
      setPassword("");
      setBirthdate("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(
        "Erro ao realizar cadastro. Verifique os campos e tente novamente."
      );
    }
  };

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

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-image-container">
          <img
            src={hero}
            alt="Paciente utilizando a plataforma"
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
          Cadastre-se agora para começar a usar nossa plataforma
        </p>
        <div className="registration-container">
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
              <strong>José Almeida</strong>
              <span>Paciente</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
