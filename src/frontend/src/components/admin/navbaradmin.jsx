import { Link } from 'react-router-dom';

const NavbarAdmin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin">
          Gestor de Eventos
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/events">📅 Eventos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">👥 Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/stats">📊 Estadísticas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-danger" to="/logout">Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;