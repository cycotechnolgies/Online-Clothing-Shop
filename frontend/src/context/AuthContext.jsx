import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // We need a loading state to prevent route redirects before user is checked
  const [loading, setLoading] = useState(true); 

  // 3. Check localStorage on app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        // If user is found, set them
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('userInfo'); // Clear corrupted data
    } finally {
      // We're done checking, so app can proceed
      setLoading(false); 
    }
  }, []); // Empty array = runs once on app load

  // 4. Login function for EMAIL/PASSWORD
  const login = async (email, password) => {
    // Call your backend /api/auth/login endpoint
    const { data } = await axios.post('/api/auth/login', { email, password });
    
    // The backend returns a { token, user } object.
    // We'll combine them to store in state and localStorage.
    const userData = {
      ...data.user,  // This has id, email, username, userType
      token: data.token // This is the JWT token
    };

    // Save to localStorage
    localStorage.setItem('userInfo', JSON.stringify(userData));
    // Save to state
    setUser(userData);
    
    // Return user data to LoginView so it can navigate
    return userData; 
  };

  // 5. Logout function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    // You could also call your /api/auth/logout here
  };

  // 6. Provide these values to all children
  const value = {
    user,
    setUser,
    login,
    logout,
    loading, // Provide the loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 7. Custom hook to use the context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};