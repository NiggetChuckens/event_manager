import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchConfirmedAssistanceEvents = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/confirmed_assistance_events`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching confirmed assistance events:', error);
    throw error;
  }
};
