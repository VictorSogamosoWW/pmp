import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileFilter } from "../utils/fileFilter.js";

// Configurar almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const savePath = path.join(__dirname, "../../uploads");

        // Crear carpeta si no existe
        if (!fs.existsSync(savePath)) {
            console.log("❌ La carpeta no existe, creando...");
            fs.mkdirSync(savePath, { recursive: true });
        }

        console.log("✅ Carpeta verificada:", savePath);
        cb(null, savePath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Inicializar `multer` con el filtro externo
const upload = multer({ storage, fileFilter });

// Middleware para manejar archivos
export const uploadMiddleware = upload.single("file");

// Controlador para subir archivos
export const handleFileUpload = (req: Request, res: Response): void => {
    res.json({ message: "Archivo subido correctamente" });
};