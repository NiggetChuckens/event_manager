export const fetchEvents = async (setEventos: Function) => {
  try {
    const response = await fetch('http://localhost:5000/eventos-proximos');
    const data = await response.json();
    setEventos(data.eventos || []);
  } catch (error) {
    console.error('Error fetching eventos:', error);
    setEventos([]);
  }
};