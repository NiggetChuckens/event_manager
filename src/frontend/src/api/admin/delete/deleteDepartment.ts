import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const deleteDepartment = async (id: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete_department`, { id });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Error deleting department.' };
  }
};
