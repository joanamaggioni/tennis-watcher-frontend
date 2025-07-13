import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';
import backgroundImage from '../../assets/tennis-background.jpg';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', { email, senha });
      const { token, perfil } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('perfil', perfil);
      navigate('/dashboard');
    } catch (err) {
      alertify.error('Email ou senha inválidos');
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>🔐 Login</h2>
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
          <button type="submit">Entrar</button>
          <p className="register-link">
            Não tem conta? <a href="/register">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
