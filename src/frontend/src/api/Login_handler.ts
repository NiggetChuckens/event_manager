import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

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

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    if (response.data.success) {
      const token = response.data.token;
      const userType = response.data.userType; // Assuming the API returns the user type

      // Store token and user type in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userType);

      return {
        success: true,
        token,
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
