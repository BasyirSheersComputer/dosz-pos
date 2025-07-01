import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pos/', // <-- Important for reverse proxy path
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
