import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    root: 'frontend',
    publicDir: 'public',
    plugins: [react()],
    server: {
        proxy: {
            '/upload': 'http://localhost:3000', // Redirige las solicitudes a /upload al backend
        },
    },
    build: {
        outDir: 'dist', // Asegura que los archivos de salida van a dist/
        emptyOutDir: true, // Limpia dist antes de construir
        sourcemap: true, // Para depuración
    }
});