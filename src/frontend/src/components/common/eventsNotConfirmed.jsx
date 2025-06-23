import { useEffect, useState } from 'react';

const EventsNotConfirmed = ({ usuarioId, onClose }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingEvents = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch(`http://localhost:5000/eventos-sin-confirmar?usuario_id=${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setEventos(data.eventos || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pending events:', error);
                setLoading(false);
            }
        };

        fetchPendingEvents();
    }, []);

    const confirmarAsistencia = (eventoId) => {
        setEventos(eventos.filter(ev => ev.id !== eventoId));
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-success border-3">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">⏳ Eventos pendientes de confirmar</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {loading ? (
                        <div className="text-center text-success">Cargando eventos...</div>
                        ) : eventos.length === 0 ? (
                        <div className="text-center text-muted">No tienes eventos pendientes de confirmar o cancelados.</div>
                        ) : (
                        <ul className="list-group">
                            {eventos.map(ev => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={ev.id}>
                                <span>
                                {ev.estado === 'pendiente' ? '⏳' : '❌'} {ev.nombre} <span className="text-muted">({ev.fecha})</span>
                                </span>
                                {['pendiente', 'cancelada'].includes(ev.estado) && (
                                <button className="btn btn-success btn-sm" onClick={() => confirmarAsistencia(ev.id)}>
                                    Confirmar asistencia
                                </button>
                                )}
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

export default EventsNotConfirmed;
