import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';
import backgroundImage from '../../assets/tennis-background.jpg';
import './Login.css'; 

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', { nome, email, senha });
      alertify.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      alertify.error('Erro ao cadastrar. Verifique os dados.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <form className="login-form" onSubmit={handleRegister}>
          <h2>📝 Cadastro</h2>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          <button
            type="button"
            onClick={handleBackToLogin}
            style={{ marginTop: '10px', backgroundColor: '#95a5a6' }}
          >
            Voltar para Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
