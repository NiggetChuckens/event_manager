import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export interface DepartmentForm {
  name: string;
  manager_name: string;
  manager_email: string;
}

export const createDepartment = async (formData: DepartmentForm) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_department`, formData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Error creating department.' };
  }
};
