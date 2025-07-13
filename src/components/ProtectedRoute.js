import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const perfil = localStorage.getItem('perfil');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && perfil !== 'admin') {
    return <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Você não tem permissão para acessar essa página.</h2>
    </div>;
  }

  return children;
};

export default ProtectedRoute;
