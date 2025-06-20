import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

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
