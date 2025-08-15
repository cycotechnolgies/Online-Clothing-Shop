import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check local storage on component mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);
  const login = (data) => {
    let userData;
    let token = null;
    try {
      if (typeof data === 'string') {
        // JWT token
        token = data;
        const decodedToken = jwtDecode(token);
        userData = {
          name: decodedToken.name,
          email: decodedToken.email,
          picture: decodedToken.picture,
        };
      } else if (typeof data === 'object' && data.token) {
        // Standard login with token
        token = data.token;
        userData = data.user;
      }
      else if (typeof data === 'object' && data !== null) {
        // Facebook user object
        userData = {
          name: data.name,
          email: data.email,
          picture: data.picture,
        };
      } else {
        throw new Error('Invalid login data format');
      }

      setUser(userData);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Failed to process login data:', error);
    }
  };

  const logout = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        await fetch('http://localhost:4000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
      } catch (error) {
        console.error('Failed to logout on server:', error);
      }
    }

    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('You have been logged out successfully.');

  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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

