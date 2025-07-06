import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute'; // Corrected import path

interface EventFormData {
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  importancia: string;
  duracion: number;
  unidadDuracion: 'minutos';
  moderador: string;
  departamento: string;
}

export const createEvent = async (formData: EventFormData, token: string): Promise<any> => {
  try {
    const eventData = {
      title: formData.titulo,
      description: formData.descripcion,
      start_date: new Date(formData.fecha + 'T' + formData.hora).toISOString(),
      end_date: new Date(formData.fecha + 'T' + formData.hora).toISOString(),
      department: formData.departamento,
      importance: formData.importancia,
      url: formData.lugar,
      moderator_email: formData.moderador,
    };

    const response = await axios.post(`${API_BASE_URL}/create_event`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
