import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchUserDetails = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
