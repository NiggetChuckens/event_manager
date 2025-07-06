import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const editEvent = async (eventData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/edit_event`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error editing event:', error);
    throw error;
  }
};
