import { useEffect, useState } from 'react';

const EventsConfirmed = ({ usuarioId, onClose }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMotivo, setShowMotivo] = useState(false);
    const [eventoCancelar, setEventoCancelar] = useState(null);
    const [motivo, setMotivo] = useState('');

    useEffect(() => {
        // Simulación de eventos confirmados para pruebas visuales
        setTimeout(() => {
            setEventos([
                {
                    id: 1,
                    nombre: 'Reunion mensual',
                    fecha: '2025-07-10',
                    descripcion: 'Reunión de seguimiento mensual con el equipo.',
                    categoria: 'Reunión',
                    departamento: 'Recursos Humanos',
                    importancia: 'Alta',
                    presentador: 'María González'
                },
                {
                    id: 2,
                    nombre: 'Charla con lideres',
                    fecha: '2025-07-15',
                    descripcion: 'Charla inspiradora con líderes de la industria.',
                    categoria: 'Charla',
                    departamento: 'Dirección',
                    importancia: 'Media',
                    presentador: 'Carlos Pérez'
                },
                {
                    id: 3,
                    nombre: 'Marketing',
                    fecha: '2025-08-01',
                    descripcion: 'Taller práctico de marketing digital.',
                    categoria: 'Taller',
                    departamento: 'Marketing',
                    importancia: 'Baja',
                    presentador: 'Ana Torres'
                },
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

    const handleCancelarClick = (evento) => {
        setEventoCancelar(evento);
        setMotivo('');
        setShowMotivo(true);
    };

    const handleMotivoSubmit = (e) => {
        e.preventDefault();
        setEventos(eventos.filter(ev => ev.id !== eventoCancelar.id));
        setShowMotivo(false);
        setEventoCancelar(null);
        setMotivo('');
        // Aquí podrías enviar el motivo al backend si lo deseas
    };

    return (
        <>
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
                                    <div className="text-muted small">Categoría: <strong>{ev.categoria}</strong> | Departamento: <strong>{ev.departamento}</strong> | Importancia: <strong>{ev.importancia}</strong></div>
                                    <div className="text-muted small">Presenta: <strong>{ev.presentador}</strong></div>
                                </div>
                                <button className="btn btn-outline-danger btn-sm mt-2 mt-md-0" onClick={() => handleCancelarClick(ev)}>
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
        {showMotivo && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-danger border-3">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Motivo de cancelación</h5>
                            <button type="button" className="btn-close" onClick={() => setShowMotivo(false)}></button>
                        </div>
                        <form onSubmit={handleMotivoSubmit}>
                            <div className="modal-body">
                                <p>Por favor, indica el motivo por el cual cancelas tu asistencia a <strong>{eventoCancelar?.nombre}</strong>:</p>
                                <textarea className="form-control" value={motivo} onChange={e => setMotivo(e.target.value)} required rows={3} placeholder="Motivo de la cancelación..." />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowMotivo(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-danger">Confirmar cancelación</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default EventsConfirmed;
