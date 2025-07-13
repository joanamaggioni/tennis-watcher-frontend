import React from 'react';
import loadingGif from '../assets/loading.gif';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <img src={loadingGif} alt="Carregando..." className="loading-gif" />
    </div>
  );
};

export default LoadingOverlay;
