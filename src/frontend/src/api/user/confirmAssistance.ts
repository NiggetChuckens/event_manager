import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const confirmAssistance = async (assistanceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/confirm_assistance`, assistanceData);
    return response.data;
  } catch (error) {
    console.error('Error confirming assistance:', error);
    throw error;
  }
};
