import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const fetchAllEvents = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch_all_events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};