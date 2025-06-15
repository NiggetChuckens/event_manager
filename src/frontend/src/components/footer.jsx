const Footer = () => {
  return (
    <footer className="bg-success text-light py-4 mt-5 border-top shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          <strong>🎟️ Gestor de Eventos</strong> &copy; 2025. Todos los derechos reservados.
        </div>
        <div className="small">
          <span className="me-3">💻 Desarrollado por <span className="fw-semibold">Anahí Adamaco, Pamela Vielma y Rodrigo Altamirano</span></span>
          <a href="mailto:soporte@gestoreventos.com" className="text-light text-decoration-underline me-2">✉️ Contacto</a>
          <a href="#" className="text-light text-decoration-underline">🔒 Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
