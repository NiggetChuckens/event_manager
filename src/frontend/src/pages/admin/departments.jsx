import { Link } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/navbar';
import Footer from '../../components/common/footer';

const AdminDepartments = () => {
  // Datos simulados; luego se puede conectar a backend con useEffect.
  const departamentos = [
    {
      id: 1,
      name: 'Recursos Humanos',
      manager_name: 'María López',
      manager_email: 'maria@example.com',
    },
    {
      id: 2,
      name: 'TI',
      manager_name: 'Carlos Núñez',
      manager_email: 'carlos@example.com',
    },
  ];

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
                  <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
                  <button className="btn btn-sm btn-outline-danger">Eliminar</button>
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