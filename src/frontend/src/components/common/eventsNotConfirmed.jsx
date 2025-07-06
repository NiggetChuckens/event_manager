import { useEffect, useState } from 'react';

const EventsNotConfirmed = ({ usuarioId, onClose }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de eventos pendientes/cancelados para pruebas visuales
        setTimeout(() => {
            setEventos([
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
            setLoading(false);
        }, 500);
        // Para datos real, descomentar lo siguiente:
        /*
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
        */
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
                            <li className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center" key={ev.id}>
                                <div>
                                    <span>{ev.estado === 'pendiente' ? '⏳' : '❌'} <strong>{ev.titulo}</strong> <span className="text-muted">({ev.fecha_inicio} - {ev.fecha_termino})</span></span>
                                    <div className="text-muted small mt-1">{ev.descripcion}</div>
                                    <div className="text-muted small">Moderador: <strong>{ev.moderador}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
                                    <div className="text-muted small">Enlace: <a href={ev.url} target="_blank" rel="noopener noreferrer">{ev.url}</a></div>
                                </div>
                                {['pendiente', 'cancelada'].includes(ev.estado) && (
                                <button className="btn btn-success btn-sm mt-2 mt-md-0" onClick={() => confirmarAsistencia(ev.id)}>
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
