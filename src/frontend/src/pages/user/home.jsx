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
    // Simulación de próximos eventos (idénticos a los confirmados)
    setTimeout(() => {
      setEventos([
        {
          id: 1,
          titulo: 'Reunión mensual',
          descripcion: 'Reunión de seguimiento mensual con el equipo.',
          fecha_inicio: '2025-07-10 09:00',
          fecha_termino: '2025-07-10 11:00',
          moderador: 'María González',
          departamento: 'Recursos Humanos',
          importancia: 'Alta',
          url: 'https://meet.example.com/reunion',
        },
        {
          id: 2,
          titulo: 'Charla con líderes',
          descripcion: 'Charla inspiradora con líderes de la industria.',
          fecha_inicio: '2025-07-15 15:00',
          fecha_termino: '2025-07-15 17:00',
          moderador: 'Carlos Pérez',
          departamento: 'Dirección',
          importancia: 'Media',
          url: 'https://meet.example.com/charla',
        },
        {
          id: 3,
          titulo: 'Marketing',
          descripcion: 'Taller práctico de marketing digital.',
          fecha_inicio: '2025-08-01 10:00',
          fecha_termino: '2025-08-01 13:00',
          moderador: 'Ana Torres',
          departamento: 'Marketing',
          importancia: 'Baja',
          url: 'https://meet.example.com/marketing',
        },
      ]);
    }, 500);
    // Para datos reales, descomentar lo siguiente:
    // fetchEvents(setEventos);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPendingEvents([
        {
          id: 10,
          titulo: 'Taller de marketing',
          descripcion: 'Aprende estrategias de marketing digital.',
          fecha_inicio: '2025-07-20 09:00',
          fecha_termino: '2025-07-20 12:00',
          moderador: 'Lucía Ramírez',
          departamento: 'Marketing',
          importancia: 'Alta',
          url: 'https://meet.example.com/marketing1',
          estado: 'pendiente'
        },
        {
          id: 11,
          titulo: 'Información',
          descripcion: 'Sesión informativa sobre nuevos proyectos.',
          fecha_inicio: '2025-07-25 14:00',
          fecha_termino: '2025-07-25 15:30',
          moderador: 'Pedro López',
          departamento: 'Dirección',
          importancia: 'Media',
          url: 'https://meet.example.com/info',
          estado: 'cancelada'
        },
        {
          id: 12,
          titulo: 'Marketing 2',
          descripcion: 'Segunda parte del taller de marketing.',
          fecha_inicio: '2025-08-05 10:00',
          fecha_termino: '2025-08-05 13:00',
          moderador: 'Ana Torres',
          departamento: 'Marketing',
          importancia: 'Baja',
          url: 'https://meet.example.com/marketing2',
          estado: 'pendiente'
        },
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
                        <li className="list-group-item" key={ev.id}>
                          <div>📅 <strong>{ev.titulo}</strong> <span className="text-muted">({ev.fecha_inicio} - {ev.fecha_termino})</span></div>
                          <div className="text-muted small mt-1">{ev.descripcion}</div>
                          <div className="text-muted small">Moderador: <strong>{ev.moderador}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
                          <div className="text-muted small">Enlace: <a href={ev.url} target="_blank" rel="noopener noreferrer">{ev.url}</a></div>
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
                        <li className="list-group-item" key={ev.id}>
                          <div>📅 <strong>{ev.titulo}</strong> <span className="text-muted">({ev.fecha_inicio} - {ev.fecha_termino})</span></div>
                          <div className="text-muted small mt-1">{ev.descripcion}</div>
                          <div className="text-muted small">Moderador: <strong>{ev.moderador}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
                          <div className="text-muted small">Enlace: <a href={ev.url} target="_blank" rel="noopener noreferrer">{ev.url}</a></div>
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
