import { useState, useEffect } from "react";
import Footer from "../../../components/common/footer";
import NavbarAdmin from "../../../components/admin/navbar";
import { fetchDepartmentById, editDepartment } from '../../../api/admin/edit/editDepartment';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    name: "",
    manager_name: "",
    manager_email: ""
  });
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const result = await fetchDepartmentById(Number(id));
      if (result.success && result.department) {
        setFormData({
          id: result.department.id,
          name: result.department.name,
          manager_name: result.department.manager_name,
          manager_email: result.department.manager_email
        });
        
      } else {
        setNotification(result.message || 'No se pudo cargar el departamento.');
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editDepartment({
      id: Number(formData.id),
      name: formData.name,
      manager_name: formData.manager_name,
      manager_email: formData.manager_email
    });
    setNotification(result.message);
    if(result){navigate('/admin/departments');}
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-success">Editar departamento</h2>
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
            Guardar Cambios
          </button>
        </form>
        {notification && (
          <div className={`alert ${notification.includes('exitosamente') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {notification}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditDepartment;