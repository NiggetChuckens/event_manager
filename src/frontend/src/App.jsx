import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './pages/login';
import HomeAdmin from './pages/admin/home';
import Events from './pages/admin/events';
import Users from './pages/admin/users-panel';
import CreateEvent from './pages/admin/create/event';
import CreateUser from './pages/admin/create/user';
import EditEvent from './pages/admin/edit/event';
import EditUser from './pages/admin/edit/user';
import Home from './pages/user/home';
import Perfil from './pages/user/perfil';
import Stats from './pages/admin/stats';
import Department from './pages/admin/departments';
import CreateDepartment from './pages/admin/create/department';
import { validateToken } from './api/admin/validateToken';

const App = () => {
  const checkSessionValidity = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      window.location.href = '/';
      return;
    }

    try {
      const response = await validateToken(token);
      if (!response.success) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error validating token:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      window.location.href = '/';
    }
  };

  const handleRedirect = (path) => {
    checkSessionValidity();
    window.location.href = path;
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const redirectPath = localStorage.getItem('redirectPath') || '/home';
      handleRedirect(redirectPath);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<IniciarSesion />} />

        {/* User routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Admin routes */}
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/stats" element={<Stats />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />
        <Route path="/admin/edit-event/:id" element={<EditEvent />} />
        <Route path="/admin/departments" element={<Department />} />
        <Route path="/admin/departments/create" element={<CreateDepartment />} />

      </Routes>
    </Router>
  );
};

export default App;