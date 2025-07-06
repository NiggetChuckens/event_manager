import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchPendingEvents = async (token: string, department: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pending_events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        department,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending events:', error);
    throw error;
  }
};
