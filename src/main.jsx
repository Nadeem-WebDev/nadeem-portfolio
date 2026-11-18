import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    {/* Vercel Web Analytics: records page views (only sends data on the live site) */}
    <Analytics />
  </StrictMode>
);
