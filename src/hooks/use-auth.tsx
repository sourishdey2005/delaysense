'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type UserRole = 'passenger' | 'airline' | 'government';

type User = {
  id: string;
  username: string;
  role: UserRole;
  password?: string; // Only used for localStorage, not exposed in context
};

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<Omit<User, 'password'> | null>;
  logout: () => void;
  signup: (username: string, password: string) => Promise<Omit<User, 'password'> | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for special roles
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

const defaultPassengerCredentials = {
    passenger: 'password',
}


const getUsersFromStorage = (): User[] => {
    if (typeof window === 'undefined') return [];
    try {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (e) {
        console.error("Failed to parse users from localStorage", e);
        return [];
    }
}

const setUsersInStorage = (users: User[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('users', JSON.stringify(users));
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const { password, ...userToSet } = JSON.parse(storedUser);
        setUser(userToSet);
      }
    } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<Omit<User, 'password'> | null> => {
    let authenticatedUser: User | null = null;
    
    await new Promise(res => setTimeout(res, 500));

    // Check hardcoded airline credentials
    if (airlineCredentials[username] && airlineCredentials[username] === password) {
      authenticatedUser = { id: username, username, role: 'airline' };
    } 
    // Check hardcoded government credentials
    else if (governmentCredentials[username] && governmentCredentials[username] === password) {
      authenticatedUser = { id: username, username, role: 'government' };
    } 
    // Check hardcoded default passenger credentials
    else if (defaultPassengerCredentials[username] && defaultPassengerCredentials[username] === password) {
        authenticatedUser = { id: username, username, role: 'passenger' };
    }
    // Check dynamically registered users from localStorage
    else {
        const storedUsers = getUsersFromStorage();
        const foundUser = storedUsers.find(u => u.username === username && u.password === password);
        if (foundUser) {
            authenticatedUser = foundUser;
        }
    }

    if (authenticatedUser) {
      const { password, ...userToSet } = authenticatedUser;
      setUser(userToSet);
      localStorage.setItem('user', JSON.stringify(userToSet));
      return userToSet;
    }

    return null;
  }, []);

  const signup = useCallback(async (username: string, password: string): Promise<Omit<User, 'password'> | null> => {
    await new Promise(res => setTimeout(res, 500));
    const storedUsers = getUsersFromStorage();
    
    const existingUser = storedUsers.find(u => u.username === username) || airlineCredentials[username] || governmentCredentials[username] || defaultPassengerCredentials[username];

    if (existingUser) {
        throw new Error("Username already exists.");
    }

    const newUser: User = {
        id: `user_${Date.now()}`,
        username,
        password,
        role: 'passenger'
    };

    const updatedUsers = [...storedUsers, newUser];
    setUsersInStorage(updatedUsers);

    const { password: _, ...userToSet } = newUser;
    setUser(userToSet);
    localStorage.setItem('user', JSON.stringify(userToSet));
    
    return userToSet;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
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

    