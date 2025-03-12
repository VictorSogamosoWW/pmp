import express from "express";
import path from "path";
import routes from "./routes/routes.js"; // Importación predeterminada

const app = express();

// Configurar el frontendPath
const frontendPath = path.join(__dirname, '../frontend/dist');

// Servir archivos estáticos del frontend
app.use(express.static(frontendPath));

// Middleware para manejar JSON
app.use(express.json());

// Rutas de la API
routes(app); // Pasar la instancia de Express a la función routes

// Manejar todas las demás rutas y servir el index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

export default app;