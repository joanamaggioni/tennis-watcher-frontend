import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <div className={`dashboard ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '←' : '☰'}
        </button>
        <h2 className="menu-title">{isOpen}</h2>
        <ul>
          <li><Link to="/dashboard">🏠 {isOpen && 'Início'}</Link></li>
          <li><Link to="/liveMatches">🔴 {isOpen && 'Ao Vivo'}</Link></li>
          <li><Link to="/players">🎾 {isOpen && 'Jogadores'}</Link></li>
          <li><Link to="/matches">📅 {isOpen && 'Partidas'}</Link></li>
          <li><Link to="/settings">⚙️ {isOpen && 'Configurações'}</Link></li>
          <li className="logout-btn" onClick={handleLogout}>🚪 {isOpen && 'Sair'}</li>
        </ul>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
