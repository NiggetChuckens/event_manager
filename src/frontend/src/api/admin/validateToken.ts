import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const validateToken = async (token: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/validate_token`, { token });
    return response.data;
  } catch (error) {
    console.error('Error validating token:', error);
    return { success: false, message: 'Failed to validate token.' };
  }
};
