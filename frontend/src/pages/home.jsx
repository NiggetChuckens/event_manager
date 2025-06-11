import Footer from '../components/footer';
import Navbar from '../components/navbar'; // ajusta la ruta si es necesario
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container text-center py-5">
        <div className="bg-light p-5 rounded-4 shadow">
          <h1 className="display-5 fw-bold text-primary"> Bienvenido al Gestor de Eventos</h1>
          <p className="lead text-secondary">Organiza, gestiona y participa en eventos de forma divertida y profesional.</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/create" className="btn btn-success px-4">✨ Crear evento</Link>
            <Link to="/events" className="btn btn-outline-primary px-4">📅 Ver eventos</Link>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-dark">📢 Próximos eventos</h3>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">📅 Reunión mensual de equipo - 15 de abril</li>
            <li className="list-group-item">🎉 Lanzamiento de producto - 20 de abril</li>
            <li className="list-group-item">🧠 Taller de capacitación - 25 de abril</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
