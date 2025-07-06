import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const createEvent = async (eventData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_event`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
