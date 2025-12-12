'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type User = {
  id: string;
  username: string;
  role: 'passenger' | 'airline' | 'government';
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials
const airlineCredentials: { [key: string]: string } = {
  airindia: 'password',
  indigo: 'password',
  vistara: 'password',
  emirates: 'password',
  etihad: 'password',
  qatar: 'password',
  lufthansa: 'password',
  singapore: 'password',
  british: 'password',
  klm: 'password',
};

const governmentCredentials = {
  government: 'password',
};

const passengerCredentials = {
    passenger: 'password',
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<User | null> => {
    let authenticatedUser: User | null = null;
    
    // Simulate async operation
    await new Promise(res => setTimeout(res, 500));

    if (airlineCredentials[username] && airlineCredentials[username] === password) {
      authenticatedUser = { id: username, username, role: 'airline' };
    } else if (governmentCredentials[username] && governmentCredentials[username] === password) {
      authenticatedUser = { id: username, username, role: 'government' };
    } else if (passengerCredentials[username] && passengerCredentials[username] === password) {
        authenticatedUser = { id: username, username, role: 'passenger' };
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      return authenticatedUser;
    }

    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
