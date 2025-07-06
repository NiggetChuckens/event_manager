import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const deleteEvent = async (eventData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete_event`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
