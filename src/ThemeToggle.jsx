import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext.jsx';

// Sun/moon button that switches between dark and light mode
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = theme === 'dark' ? Sun : Moon;

  const handleClick = (e) => {
    // The new theme spreads out in a circle from the middle of this button
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 overflow-hidden transition-colors duration-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          <Icon size={20} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
