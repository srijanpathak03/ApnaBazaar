import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize darkMode based on system preference or saved preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference first
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    
    // // Fall back to system preference
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   return true;
    // }
    
    return false;
  });

  // Apply dark mode class immediately on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Force immediate application of dark mode on page load
  // This helps prevent flash of wrong theme
  useEffect(() => {
    // This empty dependency array ensures it runs only once on mount
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (localStorage.getItem('darkMode') === null && 
       window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
       
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);