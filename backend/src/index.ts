import express from "express";
import cors from "cors";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json()); // Para manejar JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Para manejar formularios

//Servir archivos estaticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use("/uploads", uploadRoutes);

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});