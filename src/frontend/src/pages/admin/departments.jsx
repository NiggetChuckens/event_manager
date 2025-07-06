import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavbarAdmin from '../../components/admin/navbar';
import Footer from '../../components/common/footer';
import { fetchDepartments } from '../../api/admin/fetch/fetchDepartments';
import { deleteDepartment } from '../../api/admin/delete/deleteDepartment';

const AdminDepartments = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartments();
      setDepartamentos(data);
      setLoading(false);
    };
    getDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      const result = await deleteDepartment(id);
      if (result.success) {
        setDepartamentos(departamentos.filter(dep => dep.id !== id));
      } else {
        alert(result.message || 'Error al eliminar el departamento.');
      }
    }
  };

  if (loading) return <div className="container py-5">Cargando departamentos...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-success">🏢 Gestión de Departamentos</h2>
          <Link to="/admin/departments/create" className="btn btn-success">
            + Crear departamento
          </Link>
        </div>

        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Nombre</th>
              <th>Encargado</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((dep) => (
              <tr key={dep.id}>
                <td>{dep.name}</td>
                <td>{dep.manager_name}</td>
                <td>{dep.manager_email}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/admin/departments/edit/${dep.id}`)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(dep.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDepartments;