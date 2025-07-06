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
        backgroundColor: '#DAFDDC',
        padding: '1rem'
      }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 border border-4 border-success border-opacity-75 login-glow"
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#93E495',
          boxShadow: '0 0 32px 8px #25a366cc, 0 0 64px 16px #b9ffd6cc inset'
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
          🔐 Inicia sesión con tu cuenta
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">📧 Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">🔑 Contraseña</label>
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
          <button type="submit" className="btn btn-success w-100">Entrar</button>
        </form>
      </div>
      <style>{`
        .login-glow {
          box-shadow: 0 0 32px 8px #25a366cc, 0 0 64px 16px #b9ffd6cc inset !important;
          border-color: #25a366 !important;
          animation: loginGlowPulse 2s infinite alternate;
        }
        @keyframes loginGlowPulse {
          0% { box-shadow: 0 0 32px 8px #25a366cc, 0 0 64px 16px #b9ffd6cc inset; }
          100% { box-shadow: 0 0 48px 16px #25a366ee, 0 0 96px 32px #b9ffd6ee inset; }
        }
      `}</style>
    </div>
  );
};

export default Login;