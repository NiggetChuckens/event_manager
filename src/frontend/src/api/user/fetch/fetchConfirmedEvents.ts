import axios from 'axios';
import { API_BASE_URL } from '../../apiRoute';

export const fetchEvents = async (setEventos: Function) => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    setEventos(data.eventos || []);
  } catch (error) {
    console.error('Error fetching eventos:', error);
    setEventos([]);
  }
};

export const fetchConfirmedEvents = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/confirmed_events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching confirmed events:', error);
    throw error;
  }
};