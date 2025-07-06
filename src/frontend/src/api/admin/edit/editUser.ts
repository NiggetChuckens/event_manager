import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchUserById = async (id: string, token: string): Promise<{ success: boolean; name: string; email: string; role: string; message?: string }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_user_by_id`, {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { success: false, name: '', email: '', role: '', message: 'Failed to fetch user details.' };
  }
};

export const updateUser = async (
  user: { id: string; name: string; email: string; role: string; departamento: string },
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update_user`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'Failed to update user.' };
  }
};

export const fetchDepartments = async (token: string): Promise<{ success: boolean; departments: string[]; message?: string }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return { success: false, departments: [], message: 'Failed to fetch departments.' };
  }
};