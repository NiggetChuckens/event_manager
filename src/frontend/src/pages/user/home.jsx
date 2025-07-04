import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import EventsConfirmed from '../../components/common/eventsConfirmed';
import EventsNotConfirmed from '../../components/common/eventsNotConfirmed';
// import { fetchEvents } from '../../api/user/fetchEvents';
import { validateUserToken } from '../../api/user/validateToken'
// import { fetchPendingEvents } from '../../api/user/fetchPendingEvents';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [showConfirmados, setShowConfirmados] = useState(false);
  const [showSinConfirmar, setShowSinConfirmar] = useState(false);

  useEffect(() => {
    // Simulación de próximos eventos (idénticos a los confirmados, con presentador)
    setTimeout(() => {
      setEventos([
        { nombre: 'Reunion mensual', fecha_inicio: '2025-07-10', descripcion: 'Reunión de seguimiento mensual con el equipo.', categoria: 'Reunión', departamento: 'Recursos Humanos', importancia: 'Alta', presentador: 'María González' },
        { nombre: 'Charla con lideres', fecha_inicio: '2025-07-15', descripcion: 'Charla inspiradora con líderes de la industria.', categoria: 'Charla', departamento: 'Dirección', importancia: 'Media', presentador: 'Carlos Pérez' },
        { nombre: 'Marketing', fecha_inicio: '2025-08-01', descripcion: 'Taller práctico de marketing digital.', categoria: 'Taller', departamento: 'Marketing', importancia: 'Baja', presentador: 'Ana Torres' },
      ]);
    }, 500);
    // Para datos reales, descomentar lo siguiente:
    // fetchEvents(setEventos);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPendingEvents([
        { id: 10, nombre: 'Taller de marketing', fecha_inicio: '2025-07-20', estado: 'pendiente', descripcion: 'Aprende estrategias de marketing digital.', categoria: 'Taller', departamento: 'Marketing', importancia: 'Alta', presentador: 'Lucía Ramírez' },
        { id: 11, nombre: 'Informacion', fecha_inicio: '2025-07-25', estado: 'cancelada', descripcion: 'Sesión informativa sobre nuevos proyectos.', categoria: 'Sesión', departamento: 'Dirección', importancia: 'Media', presentador: 'Pedro López' },
        { id: 12, nombre: 'Marketing 2', fecha_inicio: '2025-08-05', estado: 'pendiente', descripcion: 'Segunda parte del taller de marketing.', categoria: 'Taller', departamento: 'Marketing', importancia: 'Baja', presentador: 'Ana Torres' },
      ]);
    }, 500);
    // Para datos reales, descomentar lo siguiente:
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   fetchPendingEvents(token, setPendingEvents);
    // }
  }, []);

  useEffect(() => {
    validateUserToken();
  }, []);

  const usuarioId = 1;

  return (
    <>
      <Navbar />

      <div style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-grow-1">
          <div className="container text-center py-5">
            <p className="lead fw-bold mb-5" style={{ color: '#222', fontSize: '2rem' }}>
              Organiza, gestiona y participa en eventos de forma divertida y profesional.
            </p>
            <div className="row justify-content-center g-4">
              <div className="col-12 col-md-6">
                <div className="bg-white bg-opacity-75 p-4 rounded-4 shadow border border-success h-100">
                  <h3 className="text-success mb-4">⚡ Acciones rápidas</h3>
                  <div className="d-flex flex-column gap-3">
                    <Link to="/perfil" className="btn btn-outline-success px-4">👤 Mi perfil</Link>
                    <button className="btn btn-outline-success px-4" onClick={() => setShowConfirmados(true)}>✅ Eventos confirmados</button>
                    <button className="btn btn-outline-success px-4" onClick={() => setShowSinConfirmar(true)}>⏳ Eventos por confirmar</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="bg-white bg-opacity-75 p-4 rounded-4 shadow border border-success h-100">
                  <h3 className="text-success mb-4">📢 Próximos eventos</h3>
                  <ul className="list-group list-group-flush mt-3">
                    {eventos.length === 0 ? (
                      <li className="list-group-item text-muted">No hay eventos próximos.</li>
                    ) : (
                      eventos.map((ev, i) => (
                        <li className="list-group-item" key={i}>
                          <div>📅 <strong>{ev.nombre}</strong> - {ev.fecha_inicio}</div>
                          <div className="text-muted small mt-1">{ev.descripcion}</div>
                          <div className="text-muted small">Categoría: <strong>{ev.categoria}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
                          <div className="text-muted small">Presenta: <strong>{ev.presentador}</strong></div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="bg-white bg-opacity-75 p-4 rounded-4 shadow border border-success h-100">
                  <h3 className="text-success mb-4">⏳ Eventos pendientes</h3>
                  <ul className="list-group list-group-flush mt-3">
                    {pendingEvents.length === 0 ? (
                      <li className="list-group-item text-muted">No hay eventos pendientes.</li>
                    ) : (
                      pendingEvents.map((ev, i) => (
                        <li className="list-group-item" key={i}>
                          <div>📅 <strong>{ev.nombre}</strong> - {ev.fecha_inicio}</div>
                          <div className="text-muted small mt-1">{ev.descripcion}</div>
                          <div className="text-muted small">Categoría: <strong>{ev.categoria}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
                          <div className="text-muted small">Presenta: <strong>{ev.presentador}</strong></div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showConfirmados && (<EventsConfirmed usuarioId={usuarioId} onClose={() => setShowConfirmados(false)} />)}
        {showSinConfirmar && (<EventsNotConfirmed usuarioId={usuarioId} onClose={() => setShowSinConfirmar(false)} />)}
        <Footer />
      </div>
    </>
  );
};

export default Home;
