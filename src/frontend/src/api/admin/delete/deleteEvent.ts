import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const deleteEvent = async (eventId: number, token: string, adminEmail: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/delete_event`,
      {
        admin_email: adminEmail,
        event_id: eventId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
