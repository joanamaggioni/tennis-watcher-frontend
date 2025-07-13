import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserModal from '../../components/UserModal/UserModal';
import './Settings.css';

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (user) => {
    setIsEdit(true);
    setCurrentUser({ ...user, senha: '' });
    setModalOpen(true);
  };

  const openNewModal = () => {
    setIsEdit(false);
    setCurrentUser({ nome: '', email: '', senha: '', perfil: 'usuario' });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token'); 
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/users/${currentUser.id}`, currentUser, {
          headers: { Authorization: `Bearer ${token}` } 
        });
      } else {
        await axios.post(`http://localhost:5000/auth/register`, currentUser, {
          headers: { Authorization: `Bearer ${token}` } 
        });
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error('Erro ao salvar usuário', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="content">
      <div className="settings-header">
        <h1>👤 Gerenciamento de Usuários</h1>
        <button className="new-user" onClick={openNewModal}>+ Cadastrar Novo</button>
      </div>
      <div className="table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th><th>Email</th><th>Perfil</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.perfil}</td>
              <td>
                <button onClick={() => openEditModal(user)}>✏️</button>
                <button onClick={() => handleDelete(user.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <UserModal
        user={currentUser}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onChange={handleChange}
        isEdit={isEdit}
      />
    </div>
  );
};

export default Settings;
