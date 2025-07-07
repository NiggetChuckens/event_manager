import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

interface CreateUserResponse {
  success: boolean;
  message: string;
}

export const createUser = async (
  nombre: string,
  email: string,
  password: string,
  role: string,
  adminEmail: string
): Promise<CreateUserResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_user`, {
      nombre,
      email,
      password,
      role,
      admin_email: adminEmail,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Failed to create user. Please try again.' };
  }
};
