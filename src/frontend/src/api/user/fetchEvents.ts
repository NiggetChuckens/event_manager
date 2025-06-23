import { API_BASE_URL } from '../apiRoute';

export const fetchEvents = async (setEventos: Function) => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    setEventos(data.eventos || []);
  } catch (error) {
    console.error('Error fetching eventos:', error);
    setEventos([]);
  }
};