import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.username || 'Guest');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Guest');
      }
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
      <div className="container-fluid align-items-center">
        <img src="/logo192.png" alt="Logo" width="40" height="40" className="me-2 rounded-circle border border-light" />
        <span className="navbar-brand fw-bold fs-4 me-4">Event Manager</span>
        <div className="flex-grow-1 d-flex justify-content-center">
          <span className="text-light fw-bold fs-3 text-center">Bienvenido, <span className="fw-semibold">{userName}</span></span>
        </div>
        <div className="dropdown ms-2">
          <button className="btn btn-success border border-3 border-light" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end bg-success" aria-labelledby="dropdownMenuButton">
            <li><Link className="dropdown-item text-white dropdown-item-green-hover" to="/home">🏠 Inicio</Link></li>
            <li><Link className="dropdown-item text-white dropdown-item-green-hover" to="/perfil">👤 Mi perfil</Link></li>
            <li><hr className="dropdown-divider bg-light" /></li>
            <li><Link className="dropdown-item text-danger fw-bold" to="/">🚪 Cerrar sesión</Link></li>
          </ul>
        </div>
      </div>
      <style>{`
        .dropdown-item-green-hover:hover, .dropdown-item-green-hover:focus {
          background-color: #25a366 !important;
          color: #fff !important;
        }
        #dropdownMenuButton.btn-success:hover, #dropdownMenuButton.btn-success:focus {
          background-color: #25a366 !important;
          border-color: #25a366 !important;
          color: #fff !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
