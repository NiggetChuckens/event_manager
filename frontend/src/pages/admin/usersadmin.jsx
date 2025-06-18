import Footer from "../../components/footer";
import NavbarAdmin from "../../components/navbaradmin";
const AdminUsers = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
    <NavbarAdmin />
    <div className="container py-5">
      <h2 className="mb-4">👥 Gestión de Usuarios</h2>
      <table className="table table-hover">
        <thead className="table-light">
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
          {/* Más usuarios */}
        </tbody>
      </table>
    </div>
    <Footer />
    </div>
  );
};

export default AdminUsers;