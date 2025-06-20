import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/common/footer';
import NavbarAdmin from '../../components/admin/navbar';

const AdminEvents = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  const handleDelete = (id) => {
    // Simulación frontend: alerta
    alert(`¿Deseas eliminar el evento con ID: ${id}?`);
  };

  // Simulación de eventos
  const eventos = [
    { id: 1, titulo: 'Reunión mensual', fecha: '15 abril' },
    { id: 2, titulo: 'Taller de liderazgo', fecha: '20 abril' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4">📅 Gestión de Eventos</h2>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Total de eventos: {eventos.length}</span>
          <Link to="/admin/create-event" className="btn btn-success">+ Crear nuevo evento</Link>
        </div>

        <ul className="list-group">
          {eventos.map((evento) => (
            <li
              key={evento.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {evento.titulo} - {evento.fecha}
              <div>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleEdit(evento.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(evento.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEvents;