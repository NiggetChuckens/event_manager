import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute'; 

interface EventFormData {
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  importancia: string;
  duracion: number;
  unidadDuracion: 'minutos' | 'horas';
  moderador: string;
  departamento: string;
}

async function fetchAdminEmail(token: string): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-details`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.email || '';
  } catch {
    return '';
  }
}

function addDurationToTime(time: string, duration: number, unit: 'minutos' | 'horas'): string {
  const [h, m] = time.split(':').map(Number);
  let date = new Date(0, 0, 0, h, m, 0);
  if (unit === 'horas') {
    date.setHours(date.getHours() + duration);
  } else {
    date.setMinutes(date.getMinutes() + duration);
  }
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
}

export const createEvent = async (formData: EventFormData, token: string): Promise<any> => {
  try {
    const start_date = `${formData.fecha}T${formData.hora}:00`;
    const end_time = addDurationToTime(formData.hora, Number(formData.duracion), formData.unidadDuracion);
    const end_date = `${formData.fecha}T${end_time}`;

    const admin_email = await fetchAdminEmail(token);

    const eventData = {
      admin_email,
      moderator_email: formData.moderador,
      title: formData.titulo,
      description: formData.descripcion,
      start_date,
      end_date,
      department: formData.departamento,
      importance: formData.importancia,
      url: formData.lugar,
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
