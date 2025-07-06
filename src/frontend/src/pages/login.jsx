import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/Login_handler';
  
const Login = () => {
  const [form, setForm] = useState({
    correo: '',
    contraseña: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(form.correo, form.contraseña);
    if (result.success) {
      const userType = result.userType; 

      if (userType === 'admin') {
        navigate('/admin/home');
      } else {
        navigate('/home');
      }
    } else {
      console.error('Error en el inicio de sesión:', result.message);
      alert(result.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e9f7ef 0%, #fff 100%)',
        padding: '1rem'
      }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 border-0 login-glow"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#fff',
          boxShadow: '0 8px 32px 0 #25a36633, 0 0 0 1px #25a36622',
          borderRadius: '2rem'
        }}
      >
        <div className="text-center mb-4">
          <h1 className="mb-1" style={{ color: '#222', fontSize: '2.2rem', fontWeight: 700, letterSpacing: 1 }}>Event Manager</h1>
          <h4 className="mb-0" style={{ color: '#198754', fontWeight: 500, fontSize: '1.1rem' }}>🔐 Inicia sesión con tu cuenta</h4>
        </div>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">📧 Correo electrónico</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              autoFocus
            />
          </div>
          <div className="mb-4 text-start">
            <label className="form-label fw-semibold">🔑 Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              name="contraseña"
              value={form.contraseña}
              onChange={handleChange}
              placeholder="••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fs-5 rounded-3 shadow-sm">Entrar</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-muted" style={{ fontSize: '0.95rem' }}>
            ¿No tienes cuenta? <Link to="/registro" className="text-success fw-semibold text-decoration-none">Regístrate</Link>
          </span>
        </div>
      </div>
      <style>{`
        .login-glow {
          box-shadow: 0 8px 32px 0 #25a36633, 0 0 0 1px #25a36622 !important;
          border-radius: 2rem !important;
          border: none !important;
        }
        .login-glow:focus-within {
          box-shadow: 0 0 0 4px #25a36644, 0 8px 32px 0 #25a36633;
        }
      `}</style>
    </div>
  );
};

export default Login;