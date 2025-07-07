import axios from 'axios';
import { API_BASE_URL } from './apiRoute';

interface LoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

interface UserDetailsResponse {
  success: boolean;
  message?: string;
  [key: string]: any; 
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse & { userType?: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    console.log(response.data)
    if (response.data.success) {
      const token = response.data.token;
      const userType = response.data.userType; 

      localStorage.setItem('authToken', token);

      return {
        success: true,
        token,
        userType,
        message: response.data.message
      };
    } else {
      return {
        success: false,
        message: response.data.message
      };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Login failed. Please try again.' };
  }
};

export const fetchUserDetailsWithToken = async (token: string): Promise<UserDetailsResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details with token:', error);
    return { success: false, message: 'Failed to fetch user details.' };
  }
};
