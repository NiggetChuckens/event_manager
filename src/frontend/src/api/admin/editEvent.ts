import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

interface EventFormData {
  id: number;
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

export const editEvent = async (formData: EventFormData, token: string, eventId: number): Promise<any> => {
  try {
    const calculateEndDate = (startDate: Date, duration: number): string => {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        throw new Error("Invalid start date");
      }
      start.setMinutes(start.getMinutes() + duration); 
      return start.toISOString();
    };

    const admin_data = await axios.get(`${API_BASE_URL}/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) 

    const eventData = {
      id: eventId, 
      admin_email: admin_data.data.email, 
      moderator_email: formData.moderador, 
      title: formData.titulo,
      description: formData.descripcion,
      start_date: new Date(formData.fecha + 'T' + formData.hora).toISOString(),
      end_date: calculateEndDate(new Date(formData.fecha + 'T' + formData.hora), formData.duracion),
      department: formData.departamento, 
      importance: formData.importancia,
      url: formData.lugar,
    };
    
    console.log(eventData)

    const response = await axios.post(`${API_BASE_URL}/edit_event`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing event:', error);
    throw error;
  }
};
