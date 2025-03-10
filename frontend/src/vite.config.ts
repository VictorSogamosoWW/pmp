import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  server: {
    proxy: {
      '/upload': 'http://localhost:3000', // Redirige las solicitudes a /upload al backend
    },
  },
});
