import { useState } from "react";
import Footer from "../../../components/common/footer";
import NavbarAdmin from "../../../components/admin/navbar";

const CreateDepartment = () => {
  const [formData, setFormData] = useState({
    name: "",
    manager_name: "",
    manager_email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Departamento enviado:", formData);
    // Aquí va la lógica para enviar el formulario al backend
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-success">Crear nuevo departamento</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-light p-4 rounded-4 shadow"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <div className="mb-3">
            <label className="form-label">Nombre del Departamento</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre del Encargado</label>
            <input
              type="text"
              name="manager_name"
              className="form-control"
              value={formData.manager_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email del Encargado</label>
            <input
              type="email"
              name="manager_email"
              className="form-control"
              value={formData.manager_email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Crear Departamento
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateDepartment;