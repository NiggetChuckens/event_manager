import { useEffect, useState } from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import EditProfile from '../../components/common/editProfile';

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Simulación de datos de usuario para pruebas visuales
        setTimeout(() => {
            setUsuario({
                nombre: 'Juan Pérez',
                correo: 'juan.perez@email.com',
                rol: 'Usuario',
                departamento: 'Recursos Humanos',
                fechaCreacion: '2024-01-01',
                fechaActualizacion: '2024-07-01',
                creadoPor: 'admin@empresa.com',
                actualizadoPor: 'soporte@empresa.com'
            });
        }, 500);
        // Para datos reales, descomentar lo siguiente:
        /*
        const email = localStorage.getItem('user_email');
        if (!email) return;
        fetch(`http://localhost:5000/usuario?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => setUsuario(data.usuario))
        .catch(() => setUsuario(null));
        */
    }, []);

    return (
        <>
        <Navbar />
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-success border-3 rounded-4 bg-white bg-opacity-75">
                        <div className="card-body text-center">
                            <div className="d-flex justify-content-center mb-3">
                                <div style={{ border: '4px solid #25a366', borderRadius: '1rem', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px #25a36688', background: 'transparent' }}>
                                    <span style={{ fontSize: '3rem' }}>👤</span>
                                </div>
                            </div>
                            <h2 className="text-success fw-bold mt-3 mb-1">Mi perfil</h2>
                            <p className="text-success-emphasis mb-4">Información personal del usuario</p>
                            {usuario ? (
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item bg-transparent"><span className="fw-bold">🧑 Nombre:</span> {usuario.nombre}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">📧 Correo:</span> {usuario.correo}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">🔑 Rol:</span> {usuario.rol || '-'}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">🏢 Departamento:</span> {usuario.departamento || '-'}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">🗓️ Fecha de creación:</span> {usuario.fechaCreacion || '-'}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">📝 Fecha de actualización:</span> {usuario.fechaActualizacion || '-'}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">👤 Creado por:</span> {usuario.creadoPor || '-'}</li>
                                <li className="list-group-item bg-transparent"><span className="fw-bold">� Actualizado por:</span> {usuario.actualizadoPor || '-'}</li>
                            </ul>
                            ) : (
                            <div className="text-muted">Cargando datos del usuario...</div>
                            )}
                            <button className="btn btn-success px-4" onClick={() => setShowModal(true)}>✏️ Editar perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {showModal && (
            <EditProfile usuario={usuario} onClose={() => setShowModal(false)} onUpdate={setUsuario} />
        )}
        <Footer />
        </>
    );
};

export default Perfil;
