import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Players from './Players/Players';
import Matches from './pages/Matches/Matches';
import Settings from './pages/Settings/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import LiveMatches from './pages/LiveMatches/LiveMatches';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

const isLoggedIn = () => {
  return !!localStorage.getItem('token');
}

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } 
        />

        <Route path="/" element={<Sidebar />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/liveMatches" element={<ProtectedRoute><LiveMatches /></ProtectedRoute>} />
          <Route path="/players" element={<ProtectedRoute><Players /></ProtectedRoute>} />
          <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/settings" element={
            <ProtectedRoute adminOnly={true}>
              <Settings />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
