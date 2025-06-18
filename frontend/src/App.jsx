import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/stats" element={<Stats />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/admin/editevent/:id" element={<EditEvent />} />
        <Route path="/admin/edituser/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;