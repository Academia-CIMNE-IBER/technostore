import React, { createContext, useState, useContext } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = (email, password) => {
    const userData = USERS[email];
    if (userData && userData.password === password) {
      setUser({ email, ...userData });
      setError('');
      return true;
    }
    setError('Invalid credentials');
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);