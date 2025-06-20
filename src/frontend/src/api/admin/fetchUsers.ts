import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchUsers = async (token: string): Promise<{ users: Array<{ id: number; name: string; email: string; role: string }> }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch_users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [] };
  }
};
