import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {dirname} from "path";
import { fileURLToPath } from "url"; // Importar para manejar rutas en ES modules
import { fileFilter } from "../utils/fileFilter.js";

// Obtener la ruta del archivo actual (alternativa a __dirname en ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ruta donde se guardarán los archivos
        const savePath = path.join(__dirname, "../../uploads");

        // Crear carpeta si no existe
        if (!fs.existsSync(savePath)) {
            console.log("❌ La carpeta no existe, creando...");
            fs.mkdirSync(savePath, { recursive: true }); // `recursive: true` crea la carpeta y sus padres si no existen
        }

        console.log("✅ Carpeta verificada:", savePath);
        cb(null, savePath); // Llama al callback con la ruta de destino
    },
    filename: (req, file, cb) => {
        // Nombre del archivo: timestamp + nombre original
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Inicializar `multer` con el filtro externo
const upload = multer({ storage, fileFilter });

// Middleware para manejar archivos
export const uploadMiddleware = upload.single("file");

// Controlador para subir archivos
export const handleFileUpload = (req: Request, res: Response): Response => {
    if (!req.file) {
        // Si no se subió ningún archivo, devuelve un error
        return res.status(400).json({ message: "No se ha subido ningún archivo" });
    }

    // Respuesta exitosa
     return res.json({ message: "Archivo subido correctamente", file: req.file });
};