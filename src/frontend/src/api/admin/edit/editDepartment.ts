import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';


export interface DepartmentEditForm {
  id: number;
  name: string;
  manager_name: string;
  manager_email: string;
}

export const fetchDepartmentById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_department_by_id?id=${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Error fetching department.' };
  }
};

export const editDepartment = async (formData: DepartmentEditForm) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/edit_department`, formData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: 'Error editing department.' };
  }
};
