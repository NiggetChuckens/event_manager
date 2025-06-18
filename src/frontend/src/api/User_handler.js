import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    if (response.data.success) {
      return {
        success: true,
        token: response.data.token,
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

export const fetchUserDetailsWithToken = async (token) => {
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
