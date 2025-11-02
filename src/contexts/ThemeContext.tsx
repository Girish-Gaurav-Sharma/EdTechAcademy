// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';


interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const value = useMemo(() => ({
    isDarkMode,
    toggleTheme,
  }), [isDarkMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within a ThemeProvider');
  }
  return context;
};