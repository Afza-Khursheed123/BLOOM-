import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser } from '../types/admin';
import { mockAdminUser } from '../data/mockAdminData';

interface AuthContextType {
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemoUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('bloom_admin_user');
      return saved ? JSON.parse(saved) : mockAdminUser;
    } catch {
      return mockAdminUser;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bloom_admin_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bloom_admin_user');
      }
    } catch (e) {
      console.error('Failed to save admin auth session', e);
    }
  }, [currentUser]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (email.toLowerCase().includes('bloom') || email === mockAdminUser.email) {
      if (pass.length >= 4) {
        setCurrentUser(mockAdminUser);
        return { success: true };
      }
      return { success: false, error: 'Password must be at least 4 characters.' };
    }
    return { success: false, error: 'Invalid authorized email credentials. Try avis.lee@bloomnursery.com' };
  };

  const loginAsDemoUser = () => {
    setCurrentUser(mockAdminUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        loginAsDemoUser,
        logout,
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
