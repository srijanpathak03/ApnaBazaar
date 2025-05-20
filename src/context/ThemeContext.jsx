import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize darkMode based on saved preference or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return false;
    
    try {
      // Check for saved preference first
      const savedMode = localStorage.getItem('darkMode');
      
      if (savedMode !== null) {
        return JSON.parse(savedMode);
      }
      
      // Fall back to system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return false;
    }
  });

  // Apply dark mode class when darkMode changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save preference to localStorage - this ensures the toggle state persists
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      // Force immediate localStorage update for reliability
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode));
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
      return newMode;
    });
  };

  // Provide the theme context
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};