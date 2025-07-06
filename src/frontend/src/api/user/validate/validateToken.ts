import { validateToken } from '../../../api/admin/validate/validateToken';

export const validateUserToken = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const result = await validateToken(token);
    if (!result.success) {
      console.error('Token validation failed:', result.message);
    }
  } catch (error) {
    console.error('Error validating token:', error);
  }
};
