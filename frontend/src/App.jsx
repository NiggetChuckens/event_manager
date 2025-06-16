import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import IniciarSesion from './pages/login';
import Register from './pages/register';
import HomeAdmin from './pages/homeadmin';
import Events from './pages/eventsadmi';
import Users from './pages/usersadmin';
import Stats from './pages/stats';

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
      </Routes>
    </Router>
  );
};

export default App;