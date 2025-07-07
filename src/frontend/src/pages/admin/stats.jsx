import NavbarAdmin from '../../components/admin/navbar';
import Footer from '../../components/common/footer';

const AdminStats = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-success">📊 Estadísticas Generales</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-white bg-success">
              <div className="card-body text-center">
                <h5 className="card-title">Eventos totales</h5>
                <p className="display-6">25</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success">
              <div className="card-body text-center">
                <h5 className="card-title">Usuarios activos</h5>
                <p className="display-6">13</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success">
              <div className="card-body text-center">
                <h5 className="card-title">Eventos próximos</h5>
                <p className="display-6">7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminStats;