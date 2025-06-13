import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrado:', form);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#DAFDDC',
        padding: '1rem'
      }}
    >
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#93E495'
        }}
      >
        
        <h1
          className="text-center mb-2"
          style={{
            color: '#065f46',
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
        >
          ¡Bienvenido!
        </h1>
        <h4
          className="text-center mb-4"
          style={{
            color: '#1b4332',
            fontWeight: '500'
          }}
        >
          Crea tu cuenta para comenzar
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="contraseña"
              value={form.contraseña}
              onChange={handleChange}
              placeholder="••••••"
              required
            />
          </div>

          
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#1b4332',
              color: 'white',
              border: 'none'
            }}
          >
             Registrarse
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            ¿Ya tienes cuenta?{' '}
            <Link to="/" className="text-decoration-none text-primary">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;