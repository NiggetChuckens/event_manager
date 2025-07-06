import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../../components/common/footer';
import NavbarAdmin from '../../../components/admin/navbar';
import { fetchUserById, updateUser } from '../../../api/admin/editUser';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    departamento: ''
  });

  const departamentos = [
    'Recursos Humanos',
    'TI',
    'Marketing',
    'Finanzas',
    'Logística'
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          return;
        }

        const result = await fetchUserById(id, token);
        if (result.success) {
          setForm({
            name: result.name,
            email: result.email,
            role: result.role,
            departamento: result.departamento || ''
          });
        } else {
          console.error('Failed to fetch user details:', result.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const adminEmail = decodedToken.email;

      const result = await updateUser(id, form, adminEmail, token);
      if (result.success) {
        setNotification('Usuario actualizado correctamente');
        setTimeout(() => navigate('/admin/users'), 2000);
      } else {
        console.error('Failed to update user:', result.message);
        setNotification('No se pudo actualizar el usuario. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setNotification('Ocurrió un error al actualizar el usuario.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />

      <div className="container py-5 flex-grow-1">
        {notification && <div className="alert alert-info">{notification}</div>}

        <form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
              <option value="user">Usuario</option>
              <option value="moderator">Moderador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Departamento</label>
            <select
              name="departamento"
              className="form-select"
              value={form.departamento}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un departamento</option>
              {departamentos.map((dep, index) => (
                <option key={index} value={dep}>{dep}</option>
              ))}
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