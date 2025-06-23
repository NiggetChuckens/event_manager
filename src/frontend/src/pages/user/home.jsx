import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import EventsConfirmed from '../../components/common/eventsConfirmed';
import EventsNotConfirmed from '../../components/common/eventsNotConfirmed';
import { fetchEvents } from '../../api/user/fetchEvents';
import { validateUserToken } from '../../api/user/validateToken'
import { fetchPendingEvents } from '../../api/user/fetchPendingEvents';

const Home = () => {
  
  const [eventos, setEventos] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [showConfirmados, setShowConfirmados] = useState(false);
  const [showSinConfirmar, setShowSinConfirmar] = useState(false);

  useEffect(() => {
    fetchEvents(setEventos);
  }, []);

  useEffect(() => {
    validateUserToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchPendingEvents(token, setPendingEvents);
    }
  }, []);

  const usuarioId = 1;
  

  return (
    <>
      <Navbar />

      <div style={{ minHeight: '100vh', backgroundColor: '#DAFDDC', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-grow-1">
          <div className="container text-center py-5">
            <p className="lead fw-bold mb-5" style={{ color: '#198754', fontSize: '2rem' }}>
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
                          📅 {ev.nombre} - {ev.fecha_inicio}
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
                          📅 {ev.nombre} - {ev.fecha_inicio}
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
