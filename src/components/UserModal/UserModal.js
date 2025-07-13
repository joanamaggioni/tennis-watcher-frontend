import React from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, user, onChange, onSave, isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>

        <label>Nome</label>
        <input name="nome" value={user.nome} onChange={onChange} />

        <label>Email</label>
        <input name="email" value={user.email} onChange={onChange} />

        <label>Senha</label>
        <input name="senha" type="password" value={user.senha} onChange={onChange} />

        <label>Perfil</label>
        <div className="switch-wrapper">
          <span>Usuário</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={user.perfil === 'admin'}
              onChange={() =>
                onChange({
                  target: {
                    name: 'perfil',
                    value: user.perfil === 'admin' ? 'usuario' : 'admin',
                  },
                })
              }
            />
            <span className="slider"></span>
          </label>
          <span>Admin</span>
        </div>

        <div className="modal-actions">
          <button onClick={onSave}>💾 Salvar</button>
          <button onClick={onClose}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
