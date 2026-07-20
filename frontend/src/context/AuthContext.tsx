import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const verifyToken = async (): Promise<boolean> => {
    const localToken = localStorage.getItem('adminToken');
    if (!localToken) {
      setIsAuthenticated(false);
      setLoading(false);
      return false;
    }

    try {
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${localToken}` },
      });
      if (response.data.success) {
        setIsAuthenticated(true);
        setToken(localToken);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.error('JWT validation failed:', err);
      logout();
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const login = (jwtToken: string, username: string) => {
    localStorage.setItem('adminToken', jwtToken);
    localStorage.setItem('adminUser', username);
    setToken(jwtToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
