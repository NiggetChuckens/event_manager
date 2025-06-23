import axios from 'axios';
import { API_BASE_URL } from '../apiRoute';

export const fetchPendingEvents = async (token: string, setPendingEvents: (events: any[]) => void) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pending_events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPendingEvents(response.data.events || []);
  } catch (error) {
    console.error('Error fetching pending events:', error);
    setPendingEvents([]);
  }
};
