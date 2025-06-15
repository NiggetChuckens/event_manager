import { useEffect, useState } from 'react';

const EvConfirmados = ({ usuarioId, onClose }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/eventos-confirmados?usuario_id=${usuarioId}`)
            .then(res => res.json())
            .then(data => {
                setEventos(data.eventos || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [usuarioId]);

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
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={ev.id}>
                                <span>🎉 {ev.nombre} <span className="text-muted">({ev.fecha})</span></span>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => cancelarAsistencia(ev.id)}>
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

export default EvConfirmados;
