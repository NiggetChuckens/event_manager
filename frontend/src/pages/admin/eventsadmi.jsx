import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import NavbarAdmin from '../../components/navbaradmin';

const AdminEvents = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4">📅 Gestión de Eventos</h2>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Total de eventos: 5</span>
          <Link to="/create" className="btn btn-success">+ Crear nuevo evento</Link>
        </div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Reunión mensual - 15 abril
            <div>
              <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
              <button className="btn btn-sm btn-outline-danger">Eliminar</button>
            </div>
          </li>
          {/* Más eventos aquí */}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEvents;