import axios from 'axios';
import { API_BASE_URL } from './apiRoute';

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_user`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (loginData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const deleteUser = async (deleteData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete_user`, deleteData);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

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

export const validateToken = async (token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/validate_token`, { token });
    return response.data;
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch_users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_user_by_id`, {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const updateUser = async (updateData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update_user`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
