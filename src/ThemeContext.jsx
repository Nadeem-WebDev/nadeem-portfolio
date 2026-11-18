import { createContext, useContext, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';

// theme is either 'dark' or 'light'.
// The inline script in index.html adds the 'dark' class to <html> before the
// first paint (so there's no flash of the wrong theme); this file keeps React
// in sync with that class and switches it when the toggle is clicked.
const ThemeContext = createContext(undefined);

// Matches the page background of each theme (used for the mobile browser bar)
const THEME_COLORS = { dark: '#000000', light: '#f8fafc' };

const getInitialTheme = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme]);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage unavailable (private mode etc.) – theme just won't be remembered
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // origin = { x, y } in viewport pixels: the new theme is revealed by a circle
  // growing from that point. Browsers without the View Transitions API, or
  // visitors who prefer reduced motion, get an instant switch instead.
  const toggleTheme = useCallback((origin) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Turn off CSS transitions while switching, so colors change in one go
    root.classList.add('theme-switching');
    const update = () => {
      // flushSync makes React update the toggle icon immediately (inside the snapshot)
      flushSync(() => setTheme(next));
      applyTheme(next);
    };

    if (!document.startViewTransition || reduceMotion || !origin) {
      update();
      requestAnimationFrame(() => root.classList.remove('theme-switching'));
      return;
    }

    // Distance to the farthest corner, so the circle ends up covering the screen
    const radius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y)
    );

    const transition = document.startViewTransition(update);
    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${origin.x}px ${origin.y}px)`,
              `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
