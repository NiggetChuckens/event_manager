import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

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
  id: string,
  form: { name: string; email: string; role: string },
  adminEmail: string,
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update_user`, {
      id,
      ...form,
      admin_email: adminEmail,
    }, {
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