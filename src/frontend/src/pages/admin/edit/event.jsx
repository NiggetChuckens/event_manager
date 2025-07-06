import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/common/footer';
import Navbar from '../../../components/admin/navbar';
import { editEvent } from '../../../api/admin/edit/editEvent';
import { fetchEventDetails } from '../../../api/admin/fetch/fetchEventDetails';

const EditEvent = () => {
  const { id: eventId } = useParams();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    duracion: '',
    unidadDuracion: 'minutos',
    moderador: '',
    departamento: '',
    importancia: 'Media',
  });

  useEffect(() => {
    if (!eventId) {
      console.error('Event ID is undefined');
      return;
    }

    const loadEventDetails = async () => {
      try {
        const response = await fetchEventDetails(eventId);
        if (response.success) {
          const event = response.event;
          setFormData({
            titulo: event.title,
            descripcion: event.description,
            fecha: event.start_date,
            hora: event.time, 
            lugar: event.url,
            moderador: event.moderator_email, 
            departamento: event.department,
            importancia: event.importance,
          });
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    loadEventDetails();
  }, [eventId]);

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
      const response = await editEvent({
        ...formData,
        event_id: eventId, 
      }, token);
      console.log('Event edited successfully:', response);
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4">Editar Evento</h2>

        <form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow">
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

            <div className="col-md-4 mb-3">
              <label className="form-label">Duración</label>
              <div className="input-group">
                <input
                  type="number"
                  name="duracion"
                  className="form-control"
                  placeholder="Ej: 60"
                  value={formData.duracion}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <span className="input-group-text">/</span>
                <select
                  name="unidadDuracion"
                  className="form-select"
                  value={formData.unidadDuracion}
                  onChange={handleChange}
                >
                  <option value="minutos">minutos</option>
                  <option value="horas">horas</option>
                </select>
              </div>
            </div>
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

          <button type="submit" className="btn btn-success mt-3">Guardar Cambios</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditEvent;