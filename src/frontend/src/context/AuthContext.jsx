import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../api/user/validate/validateToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        navigate('/login');
        return;
      }
      try {
        const valid = await validateToken(token);
        setIsAuthenticated(!!valid);
        if (!valid) navigate('/login');
      } catch {
        setIsAuthenticated(false);
        navigate('/login');
      }
      setLoading(false);
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
