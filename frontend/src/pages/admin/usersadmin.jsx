import Footer from "../../components/footer";
import NavbarAdmin from "../../components/navbaradmin";
import { Link } from 'react-router-dom';


const AdminUsers = () => {
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
            <tr>
              <td>María López</td>
              <td>maria@example.com</td>
              <td>Usuario</td>
              <td>
                <button className="btn btn-sm btn-outline-warning me-2">Cambiar rol</button>
                <button className="btn btn-sm btn-outline-danger">Eliminar</button>
              </td>
            </tr>
            {/* Puedes mapear usuarios reales desde props o estado más adelante */}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AdminUsers;