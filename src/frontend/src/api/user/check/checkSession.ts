export function getAuthToken() {
  return sessionStorage.getItem('authToken');
}

export async function checkTokenAndRedirect(navigate: Function, validateToken: (token: string) => Promise<boolean>, setIsAuthenticated: Function) {
  const token = getAuthToken();
  if (!token) {
    navigate('/login');
    return;
  }
  try {
    const valid = await validateToken(token);
    if (!valid) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
  } catch (error) {
    navigate('/login');
  }
}

export async function fetchAllUserData(
  isAuthenticated: boolean,
  setEventos: Function,
  setPendingEvents: Function,
  fetchEvents: Function,
  fetchUpcomingEvents: Function,
  fetchConfirmedAssistanceEvents: Function
) {
  if (!isAuthenticated) return;
  try {
    const token = getAuthToken();
    const [eventsResponse, upcomingEventsResponse, assistanceEventsResponse] = await Promise.all([
      fetchEvents(),
      fetchUpcomingEvents(),
      token ? fetchConfirmedAssistanceEvents(token) : Promise.resolve({ events: [] }),
    ]);
    setEventos(upcomingEventsResponse.events || eventsResponse.events);
    setPendingEvents(assistanceEventsResponse.events);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
