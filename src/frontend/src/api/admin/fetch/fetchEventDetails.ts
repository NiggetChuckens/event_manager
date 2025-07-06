import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchEventDetails = async (eventId: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_event_by_id`, {
      params: { event_id: eventId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};
