import { useEffect, useState } from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import { Link, useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../api/user/fetch/fetchConfirmedEvents';
import { fetchPendingEvents } from '../../api/user/fetch/fetchPendingEvents';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [showConfirmados, setShowConfirmados] = useState(false);
  const [showSinConfirmar, setShowSinConfirmar] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchAll = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        // Confirmed events
        const confirmed = await fetchEvents(token);
        setEventos(confirmed.events || []);
        // Pending events
        const pending = await fetchPendingEvents(token);
        setPendingEvents(pending.events || []);
        // You can also fetch upcoming events if needed
        // const upcoming = await fetchUpcomingEvents();
      } catch (error) {
        setEventos([]);
        setPendingEvents([]);
      }
    };
    fetchAll();
  }, [isAuthenticated]);

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
                          <div>📅 <strong>{ev.title}</strong> - {ev.start_date}</div>
                          <div className="text-muted small">Departamento: <strong>{ev.department}</strong></div>
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
                          <div>📅 <strong>{ev.title}</strong> - {ev.start_date}</div>
                          <div className="text-muted small">Departamento: <strong>{ev.department}</strong></div>
                          {ev.can_confirm && (
                            <button className="btn btn-success btn-sm mt-2">Confirmar asistencia</button>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
