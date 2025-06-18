import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer';
import NavbarAdmin from '../../components/navbaradmin';

const EditUserPage = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    // Aquí puedes hacer fetch a tu backend para obtener los datos reales
    const fetchUser = async () => {
      const data = {
        name: 'Usuario Ejemplo',
        email: 'usuario@ejemplo.com',
        role: 'admin',
      };
      setForm(data);
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario actualizado:', form);
    // Aquí podrías hacer fetch para guardar los cambios
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />

      <div className="container py-5 flex-grow-1">
        <form
          onSubmit={handleSubmit}
          className="bg-light p-4 rounded-4 shadow"
          style={{ maxWidth: '500px', margin: '0 auto' }}
        >
          <h2 className="mb-4 text-center text-success">Editar Usuario</h2>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Guardar Cambios
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditUserPage;