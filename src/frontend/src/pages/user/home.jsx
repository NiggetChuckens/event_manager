import { useEffect, useState } from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import { Link, useNavigate } from 'react-router-dom';
import { fetchConfirmedEvents } from '../../api/user/fetch/fetchConfirmedEvents';
import { fetchPendingEvents } from '../../api/user/fetch/fetchPendingEvents';
import { fetchUpcomingEvents } from '../../api/user/fetch/fetchUpcomingEvents';
import { fetchUserDetails } from '../../api/user/fetch/fetchUserDetails';
import { confirmAssistance } from '../../api/user/confirm/confirmAssistance';
import { cancelAssistance } from '../../api/user/cancel/cancelAssistance';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [confirmedEvents, setConfirmedEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [userDepartment, setUserDepartment] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchAll = async (token, department) => {
    // Refresca todos los eventos
    const upcoming = await fetchUpcomingEvents();
    setUpcomingEvents(upcoming.events || []);
    const confirmed = await fetchConfirmedEvents(token);
    setConfirmedEvents(confirmed.events || []);
    const pending = await fetchPendingEvents(token, department);
    setPendingEvents(pending.events || []);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const userDetails = await fetchUserDetails(token);
        const department = userDetails?.user?.department || '';
        const email = userDetails?.user?.email || '';
        setUserDepartment(department);
        setUserEmail(email);
        await fetchAll(token, department);
      } catch (error) {
        setUpcomingEvents([]);
        setConfirmedEvents([]);
        setPendingEvents([]);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleConfirm = async (eventId) => {
    try {
      const token = sessionStorage.getItem('authToken');
      await confirmAssistance({ event_id: eventId, user_email: userEmail, token });
      await fetchAll(token, userDepartment);
    } catch (error) {
      alert('Error al confirmar asistencia');
    }
  };

  const handleCancel = async (eventId) => {
    try {
      const token = sessionStorage.getItem('authToken');
      await cancelAssistance({ event_id: eventId, user_email: userEmail, token });
      await fetchAll(token, userDepartment);
    } catch (error) {
      alert('Error al cancelar asistencia');
    }
  };

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
                  <ul
                    className="list-group list-group-flush mt-3"
                    style={{
                      maxHeight: '320px', // 4 items aprox. (4 x 80px)
                      overflowY: upcomingEvents.length > 4 ? 'auto' : 'unset',
                      minHeight: '80px',
                    }}
                  >
                    {upcomingEvents.length === 0 ? (
                      <li className="list-group-item text-muted">No hay eventos próximos.</li>
                    ) : (
                      upcomingEvents.map((ev, i) => (
                        <li className="list-group-item" key={i}>
                          <div>📅 <strong>{ev.title}</strong> - {ev.start_date}</div>
                          {ev.department && (
                            <div className="text-muted small">Departamento: <strong>{ev.department}</strong></div>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="bg-white bg-opacity-75 p-4 rounded-4 shadow border border-success h-100">
                  <h3 className="text-success mb-4">✅ Eventos confirmados</h3>
                  <ul
                    className="list-group list-group-flush mt-3"
                    style={{
                      maxHeight: '320px',
                      overflowY: confirmedEvents.length > 4 ? 'auto' : 'unset',
                      minHeight: '80px',
                      overflowX: 'hidden',
                      display: 'block',
                    }}
                  >
                    {confirmedEvents.length === 0 ? (
                      <li className="list-group-item text-muted">No hay eventos confirmados.</li>
                    ) : (
                      confirmedEvents.map((ev, i) => (
                        <li className="list-group-item" key={i}>
                          <div>📅 <strong>{ev.title}</strong> - {ev.start_date}</div>
                          {ev.department && (
                            <div className="text-muted small">Departamento: <strong>{ev.department}</strong></div>
                          )}
                          <button className="btn btn-danger btn-sm mt-2" onClick={() => handleCancel(ev.id)}>
                            Cancelar asistencia
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="bg-white bg-opacity-75 p-4 rounded-4 shadow border border-success h-100">
                  <h3 className="text-success mb-4">⏳ Eventos pendientes</h3>
                  <ul
                    className="list-group list-group-flush mt-3"
                    style={{
                      maxHeight: '320px',
                      overflowY: pendingEvents.length > 4 ? 'auto' : 'unset',
                      minHeight: '80px',
                    }}
                  >
                    {pendingEvents.length === 0 ? (
                      <li className="list-group-item text-muted">No hay eventos pendientes.</li>
                    ) : (
                      pendingEvents.map((ev, i) => (
                        <li className="list-group-item" key={i}>
                          <div>📅 <strong>{ev.title}</strong> - {ev.start_date}</div>
                          {ev.department && (
                            <div className="text-muted small">Departamento: <strong>{ev.department}</strong></div>
                          )}
                          {ev.can_confirm && (
                            <button className="btn btn-success btn-sm mt-2" onClick={() => handleConfirm(ev.id)}>
                              Confirmar asistencia
                            </button>
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
