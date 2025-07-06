import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/upcoming_events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};
