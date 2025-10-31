// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

// 1. Define what the context will provide
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 2. Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 4. Create a memoized function to toggle the state
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // 5. Memoize the value
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

// 6. Create a custom hook for easy access
export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within a ThemeProvider');
  }
  return context;
};