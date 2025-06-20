import { Link } from 'react-router-dom';
import Footer from '../../components/common/footer';
import NavbarAdmin from '../../components/admin/navbaradmin';

const AdminHome = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <div className="bg-white p-5 rounded-4 shadow">
          <h1 className="display-5 fw-bold ">Panel de Administración</h1>
          <p className="lead ">
            Bienvenida, administrador. Desde aquí puedes gestionar los eventos, usuarios y revisar estadísticas.
          </p>

          <div className="row mt-4 g-4">
            <div className="col-md-4">
              <div className="card border-success h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-success">📅 Eventos</h5>
                  <p className="card-text text-muted">Crea, edita o elimina eventos programados.</p>
                  <Link to="/admin/events" className="btn btn-success">Gestionar</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-success h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-success">👥 Usuarios</h5>
                  <p className="card-text text-muted">Administra los usuarios registrados y sus roles.</p>
                  <Link to="/admin/users" className="btn btn-success">Ver usuarios</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-success h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-success">📊 Estadísticas</h5>
                  <p className="card-text text-muted">Consulta métricas y actividad reciente.</p>
                  <Link to="/admin/stats" className="btn btn-success">Ver estadísticas</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminHome;