import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './pages/login';
import Register from './pages/register';
import HomeAdmin from './pages/admin/homeadmin';
import Events from './pages/admin/eventsadmi';
import Users from './pages/admin/usersadmin';
import Stats from './pages/admin/stats';
import CreateEvent from './pages/admin/createevent';
import CreateUser from './pages/admin/createuser';
import EditEvent from './pages/admin/editevent';
import EditUser from './pages/admin/edituser';
import Home from './pages/user/home';
import Perfil from './pages/user/perfil';

const App = () => {
  return (
    <Router>
      <Routes>
        // Default route
        <Route path="/" element={<IniciarSesion />} />

        // User routes
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />

        // Admin routes
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/stats" element={<Stats />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />
        <Route path="/admin/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
};

export default App;