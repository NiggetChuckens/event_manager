import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export interface Department {
  id: number;
  name: string;
  manager_name: string;
  manager_email: string;
}

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch_departments`);
    if (response.data.success && Array.isArray(response.data.departments)) {
      return response.data.departments;
    }
    return [];
  } catch (error) {
    return [];
  }
};
