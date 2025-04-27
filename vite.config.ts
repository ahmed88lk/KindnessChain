import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Add better error overlay and reporting
  server: {
    open: true,
    host: true,
    hmr: true,
  },
  build: {
    sourcemap: true,
  },
});
