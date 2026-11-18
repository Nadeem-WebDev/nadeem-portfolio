import { createContext, useContext } from 'react';

// Shared by ThemeProvider (ThemeContext.jsx), which fills it in, and any
// component that reads or switches the theme through useTheme().
// Kept in its own file so ThemeContext.jsx only exports a component
// (React's fast refresh works best that way).
export const ThemeContext = createContext(undefined);

// Returns { theme: 'dark' | 'light', toggleTheme(origin) }
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
