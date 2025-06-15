import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './pages/login';

/* Rutas del usuario */
import Home from './pages/user/home';
import Perfil from './pages/user/perfil';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/" element={<IniciarSesion />} />
      </Routes>
    </Router>
  );
};

export default App;