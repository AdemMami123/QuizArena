'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme state (defaulting to system preference or light)
  const [theme, setTheme] = useState<Theme>('light');

  // Effect to initialize theme from localStorage and system preference
  useEffect(() => {
    // Get stored theme from localStorage or use system preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Use system preference
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Apply theme to document
    document.documentElement.dataset.theme = storedTheme || (prefersDark ? 'dark' : 'light');
  }, []);

  // Update the document theme attribute when theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}