import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import IniciarSesion from './pages/login';
import Register from './pages/register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;