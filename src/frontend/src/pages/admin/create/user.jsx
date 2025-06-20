import { useState } from "react";
import Footer from '../../../components/common/footer';
import NavbarAdmin from '../../../components/admin/navbar';
import { createUser } from '../../../api/admin/createUser';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    admin: false, 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "admin") {
      setFormData({ ...formData, admin: value }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const adminEmail = decodedToken.email;

    try {
      const response = await createUser(
        formData.nombre,
        formData.email,
        formData.password,
        formData.admin,
        adminEmail
      );
      alert(response.message);
      navigate('/admin/users');
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-success">Crear nuevo usuario</h2>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              name="admin"
              className="form-select"
              value={formData.admin}
              onChange={handleChange}
              required
            >
              <option value="user">Usuario</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Crear usuario</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUser;