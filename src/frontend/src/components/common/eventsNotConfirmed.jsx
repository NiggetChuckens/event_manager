import { useEffect, useState } from 'react';

const EventsNotConfirmed = ({ usuarioId, onClose }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de eventos pendientes/cancelados para pruebas visuales
        setTimeout(() => {
            setEventos([
                { id: 10, nombre: 'Taller de marketing', fecha: '2025-07-20', estado: 'pendiente', descripcion: 'Aprende estrategias de marketing digital.', categoria: 'Taller', departamento: 'Marketing', importancia: 'Alta' },
                { id: 11, nombre: 'Informacion', fecha: '2025-07-25', estado: 'cancelada', descripcion: 'Sesión informativa sobre nuevos proyectos.', categoria: 'Sesión', departamento: 'Dirección', importancia: 'Media' },
                { id: 12, nombre: 'Marketing 2', fecha: '2025-08-05', estado: 'pendiente', descripcion: 'Segunda parte del taller de marketing.', categoria: 'Taller', departamento: 'Marketing', importancia: 'Baja' },
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
                                    <span>{ev.estado === 'pendiente' ? '⏳' : '❌'} <strong>{ev.nombre}</strong> <span className="text-muted">({ev.fecha})</span></span>
                                    <div className="text-muted small mt-1">{ev.descripcion}</div>
                                    <div className="text-muted small">Categoría: <strong>{ev.categoria}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
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
