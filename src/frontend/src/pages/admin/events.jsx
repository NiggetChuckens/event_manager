import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/common/footer';
import NavbarAdmin from '../../components/admin/navbar';
import { fetchAllEvents } from '../../api/admin/fetch/fetchEvents';
import { editEvent } from '../../api/admin/edit/editEvent';
import { deleteEvent } from '../../api/admin/delete/deleteEvent';
import { differenceInMinutes } from 'date-fns';

const AdminEvents = () => {
  const [eventos, setEventos] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    moderador: '',
    departamento: '',
    importancia: 'Media',
    duracion: 0,
    unidadDuracion: 'minutos',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await fetchAllEvents(token);
        setEventos(response.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  const handleDelete = async (id) => {
    const evento = eventos.find((e) => e.id === id);
    const eventName = evento ? evento.title : id;
    if (window.confirm(`¿Deseas eliminar el evento: ${eventName}?`)) {
      try {
        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('user'));
        const adminEmail = user?.email;
        await deleteEvent(id, token, adminEmail);
        setEventos(eventos.filter((evento) => evento.id !== id));
      } catch (error) {
        alert('Error eliminando el evento.');
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEditClick = (evento) => {
    setEditingEventId(evento.id);
    const startDate = new Date(evento.start_date); // Parse string into Date object
    const endDate = new Date(evento.end_date);
    const duration = differenceInMinutes(endDate, startDate);

    setFormData({
      titulo: evento.title,
      descripcion: evento.description,
      fecha: startDate.toISOString().split('T')[0], 
      hora: startDate.toISOString().split('T')[1].split(':00.')[0], 
      lugar: evento.url,
      importancia: evento.importance,
      duracion: duration,
      unidadDuracion: 'minutos',
      moderador: evento.moderator_email, 
      departamento: evento.department, 
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await editEvent(formData, token, editingEventId);
      console.log('Event edited successfully:', response);
      setEditingEventId(null); 
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };


  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4">📅 Gestión de Eventos</h2>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Total de eventos: {eventos.length}</span>
          <Link to="/admin/create-event" className="btn btn-success">+ Crear nuevo evento</Link>
        </div>

        <ul className="list-group">
          {eventos.map((evento) => (
            <li
              key={evento.id}
              className="list-group-item d-flex flex-column align-items-start"
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>
                  {evento.title} - {evento.start_date.split('T')[1].split(':00.')[0]}
                  {(() => {
                    const startDate = new Date(evento.start_date);
                    const endDate = new Date(evento.end_date);
                    const duration = differenceInMinutes(endDate, startDate);
                    return (
                      <span className="ms-2 text-secondary">
                        ({duration} minutos)
                      </span>
                    );
                  })()}
                </span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => handleEditClick(evento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(evento.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              {editingEventId === evento.id && (
                <div>
                  <form onSubmit={handleSubmit} className="mt-3 bg-light p-3 rounded">
                    <div className="mb-3">
                      <label className="form-label">Título del evento</label>
                      <input
                        type="text"
                        name="titulo"
                        className="form-control"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        name="descripcion"
                        className="form-control"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="3"
                        required
                      ></textarea>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Fecha</label>
                        <input
                          type="date"
                          name="fecha"
                          className="form-control"
                          value={formData.fecha}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Hora</label>
                        <input
                          type="time"
                          name="hora"
                          className="form-control"
                          value={formData.hora}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Moderador</label>
                          <input
                            type="text"
                            name="moderador"
                            className="form-control"
                            value={formData.moderador}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Departamento</label>
                          <input
                            type="text"
                            name="departamento"
                            className="form-control"
                            value={formData.departamento}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Link</label>
                        <input
                          type="text"
                          name="lugar"
                          className="form-control"
                          value={formData.lugar}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Importancia</label>
                      <select
                        name="importancia"
                        className="form-select"
                        value={formData.importancia}
                        onChange={handleChange}
                      >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Duración</label>
                      <input
                        type="number"
                        name="duracion"
                        className="form-control"
                        value={formData.duracion}
                        onChange={handleChange}
                        required
                      />
                      <span className="ms-2">minutos</span>
                    </div>

                    <button type="submit" className="btn btn-success">Guardar Cambios</button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEvents;