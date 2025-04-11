import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Bienvenido al Gestor de Eventos Empresariales</h1>
        <p className="lead">Organiza, gestiona y participa en eventos de manera eficiente.</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/create" className="btn btn-primary">Crear evento</Link>
          <Link to="/events" className="btn btn-outline-secondary">Ver eventos</Link>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="h4 mb-3">📌 Próximos eventos</h2>
        <ul className="list-group">
          <li className="list-group-item">📅 Reunión mensual de equipo - <strong>15 de abril</strong></li>
          <li className="list-group-item">🎉 Lanzamiento de producto - <strong>20 de abril</strong></li>
          <li className="list-group-item">🧠 Taller de capacitación - <strong>25 de abril</strong></li>
        </ul>
      </section>

      <footer className="text-center text-muted">
        <p>¿Nuevo aquí? <Link to="/register" className="text-decoration-none">Regístrate</Link></p>
        <p>¿Ya tienes cuenta? <Link to="/login" className="text-decoration-none">Inicia sesión</Link></p>
      </footer>
    </div>
  );
};

export default Home;