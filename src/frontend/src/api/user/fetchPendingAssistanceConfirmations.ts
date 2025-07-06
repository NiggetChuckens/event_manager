import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const fetchPendingAssistanceConfirmations = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pending_assistance_confirmations`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending assistance confirmations:', error);
    throw error;
  }
};
