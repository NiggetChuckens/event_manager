import { useState } from "react";
import Footer from '../../../components/common/footer';
import NavbarAdmin from '../../../components/admin/navbar';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    admin: "user",
    departamento: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario enviado:", formData);
    // Aquí iría la lógica de envío al backend
  };

  const departamentos = [
    "Recursos Humanos",
    "TI",
    "Marketing",
    "Finanzas",
    "Logística"
  ];

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
              <option value="moderator">Moderador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Departamento</label>
            <select
              name="departamento"
              className="form-select"
              value={formData.departamento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un departamento</option>
              {departamentos.map((dep, index) => (
                <option key={index} value={dep}>{dep}</option>
              ))}
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