import { useEffect, useState } from 'react';

const EventsConfirmed = ({ usuarioId, onClose }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de eventos confirmados para pruebas visuales
        setTimeout(() => {
            setEventos([
                { id: 1, nombre: 'Reunion mensual', fecha: '2025-07-10', descripcion: 'Reunión de seguimiento mensual con el equipo.' },
                { id: 2, nombre: 'Charla con lideres', fecha: '2025-07-15', descripcion: 'Charla inspiradora con líderes de la industria.' },
                { id: 3, nombre: 'Marketing', fecha: '2025-08-01', descripcion: 'Taller práctico de marketing digital.' },
            ]);
            setLoading(false);
        }, 500);
        // Para datos reales, descomentar lo siguiente:
        /*
        const fetchConfirmedEvents = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch(`http://localhost:5000/eventos-confirmados?usuario_id=${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setEventos(data.eventos || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching confirmed events:', error);
                setLoading(false);
            }
        };

        fetchConfirmedEvents();
        */
    }, []);

    const cancelarAsistencia = (eventoId) => {
        setEventos(eventos.filter(ev => ev.id !== eventoId));
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-success border-3">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">✅ Eventos confirmados</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {loading ? (
                        <div className="text-center text-success">Cargando eventos...</div>
                        ) : eventos.length === 0 ? (
                        <div className="text-center text-muted">No tienes eventos confirmados.</div>
                        ) : (
                        <ul className="list-group">
                            {eventos.map(ev => (
                            <li className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center" key={ev.id}>
                                <div>
                                    <span>🎉 <strong>{ev.nombre}</strong> <span className="text-muted">({ev.fecha})</span></span>
                                    <div className="text-muted small mt-1">{ev.descripcion}</div>
                                </div>
                                <button className="btn btn-outline-danger btn-sm mt-2 mt-md-0" onClick={() => cancelarAsistencia(ev.id)}>
                                    Cancelar asistencia
                                </button>
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsConfirmed;
