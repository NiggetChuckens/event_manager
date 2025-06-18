import Footer from "../../components/footer";
import NavbarAdmin from "../../components/navbaradmin";
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'María López', email: 'maria@example.com', role: 'Usuario' },
    { id: 2, name: 'Pedro Torres', email: 'pedro@example.com', role: 'Administrador' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-success">👥 Gestión de Usuarios</h2>
        <div className="d-flex justify-content-between mb-3">
          <Link to="/createuser" className="btn btn-success">+ Crear nuevo usuario</Link>
        </div>

        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/admin/edituser/${user.id}`}
                    className="btn btn-sm btn-outline-warning me-2"
                  >
                    Editar
                  </Link>
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

export default AdminUsers;