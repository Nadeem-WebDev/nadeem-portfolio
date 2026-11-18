import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel serves 404.html for any address that doesn't exist. Vite's own servers
// (`npm run dev` and `npm run preview`) instead show the home page for every
// address, so this plugin makes them serve 404.html too. Local = live.
function notFoundPage() {
  const isPageRequest = (req) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return false;
    if (!(req.headers.accept || '').includes('text/html')) return false;
    const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    if (pathname === '/' || pathname === '/index.html') return false;
    // Files (anything with an extension) and Vite's internal URLs are left alone
    return !path.extname(pathname) && !pathname.startsWith('/@');
  };

  const serve404 = (file) => (req, res, next) => {
    if (!isPageRequest(req)) return next();
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(file));
  };

  return {
    name: 'serve-404-page',
    configureServer(server) {
      server.middlewares.use(serve404(path.resolve(server.config.publicDir, '404.html')));
    },
    configurePreviewServer(server) {
      server.middlewares.use(serve404(path.resolve(server.config.build.outDir, '404.html')));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), notFoundPage()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
