import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AdminUser {
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('tg27_admin_token'));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('tg27_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      api.getMe()
        .then((user) => {
          setAdminUser(user);
          localStorage.setItem('tg27_admin_user', JSON.stringify(user));
        })
        .catch(() => {
          // Token expired or invalid
          logout();
        });
    }
  }, [token]);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await api.adminLogin(credentials);
      setToken(res.access_token);
      localStorage.setItem('tg27_admin_token', res.access_token);
      
      const user = {
        email: res.admin_email,
        full_name: res.admin_name,
        role: res.role,
      };
      setAdminUser(user);
      localStorage.setItem('tg27_admin_user', JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem('tg27_admin_token');
    localStorage.removeItem('tg27_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin: Boolean(token && adminUser),
        adminUser,
        token,
        login,
        logout,
        isLoading,
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

