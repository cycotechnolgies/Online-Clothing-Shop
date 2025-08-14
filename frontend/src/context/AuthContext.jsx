import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const login = (data) => {
    let userData;
    if (typeof data === 'string') {
      // Google JWT token
      try {
        const decodedToken = jwtDecode(data);
        userData = {
          name: decodedToken.name,
          email: decodedToken.email,
          picture: decodedToken.picture,
        };
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        return;
      }
    } else if (typeof data === 'object' && data !== null) {
      // Facebook user object
      userData = {
        name: data.name,
        email: data.email,
        picture: data.picture,
      };
    }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('You have been logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
