import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const cancelAssistance = async (assistanceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cancel_assistance`, assistanceData);
    return response.data;
  } catch (error) {
    console.error('Error canceling assistance:', error);
    throw error;
  }
};
