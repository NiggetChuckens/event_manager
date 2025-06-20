import { useState } from 'react';

const EditProfile = ({ usuario, onClose, onUpdate }) => {
    const [form, setForm] = useState({
        nombre: usuario?.nombre || '',
        correo: usuario?.correo || '',
        edad: usuario?.edad || '',
        direccion: usuario?.direccion || '',
        fechaNacimiento: usuario?.fechaNacimiento || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/usuario', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success && onUpdate) onUpdate({ ...usuario, ...form });
            onClose();
        })
        .catch(() => onClose());
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-success border-3">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">✏️ Editar perfil</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">🧑 Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">📧 Correo</label>
                                <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">🎂 Edad</label>
                                <input type="number" className="form-control" name="edad" value={form.edad} onChange={handleChange} min="0" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">🏠 Dirección</label>
                                <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">📅 Fecha de nacimiento</label>
                                <input type="date" className="form-control" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-success" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-success">Guardar cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
