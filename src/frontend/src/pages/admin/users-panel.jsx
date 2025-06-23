import Footer from '../../components/common/footer';
import NavbarAdmin from '../../components/admin/navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/admin/fetchUsers';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetchUsers(token);
        setUsers(response.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (users.length === 0) {
      getUsers();
    }
  }, []);

  const handleDeleteUser = async (email) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar a este usuario? Esta acción no se puede deshacer.');

    if (!confirmDelete) {
      console.log('Operación de eliminación cancelada');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const adminEmail = decodedToken.email;

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/delete_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ admin_email: adminEmail, target_email: email }),
      });

      const result = await response.json();
      if (result.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
        console.log('Usuario eliminado con éxito');
      } else {
        console.error('Error al eliminar usuario:', result.message);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-success">👥 Gestión de Usuarios</h2>
        <div className="d-flex justify-content-between mb-3">
          <Link to="/admin/create-user" className="btn btn-success">+ Crear nuevo usuario</Link>
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
                    to={`/admin/edit-user/${user.id}`}
                    className="btn btn-sm btn-outline-warning me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    Eliminar
                  </button>
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