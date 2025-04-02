import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockLogin, mockSignup } from '../services/mockAuthService';

const AuthContext = createContext();
const IS_DEVELOPMENT = true; // Set to false when the real backend is ready

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, isVendor = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let userData;
      
      if (IS_DEVELOPMENT) {
        // Use mock service in development
        userData = await mockLogin(email, password, isVendor);
      } else {
        // Use real API in production
        const response = await fetch(`/api/${isVendor ? 'vendor' : 'user'}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        // Check if the response is empty
        const text = await response.text();
        if (!text) {
          throw new Error('Server returned an empty response');
        }
        
        // Try to parse JSON
        try {
          userData = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse JSON response:', text);
          throw new Error('Invalid response from server');
        }
        
        if (!response.ok) {
          throw new Error(userData.message || 'Login failed');
        }
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData, isVendor = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let responseData;
      
      if (IS_DEVELOPMENT) {
        // Use mock service in development
        responseData = await mockSignup(userData, isVendor);
      } else {
        // Use real API in production
        const response = await fetch(`/api/${isVendor ? 'vendor' : 'user'}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        // Check if the response is empty
        const text = await response.text();
        if (!text) {
          throw new Error('Server returned an empty response');
        }
        
        // Try to parse JSON
        try {
          responseData = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse JSON response:', text);
          throw new Error('Invalid response from server');
        }
        
        if (!response.ok) {
          throw new Error(responseData.message || 'Signup failed');
        }
      }
      
      localStorage.setItem('user', JSON.stringify(responseData));
      localStorage.setItem('token', responseData.token);
      setCurrentUser(responseData);
      return responseData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userLoading: loading,
    userError: error,
    login,
    signup,
    logout,
    isVendor: currentUser?.role === 'vendor',
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 