import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const almacenamiento = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        const tipo = req.body.tipo || "otros"; // Si no se envía, usar "otros"
        const linkCarga = path.join(__dirname, '..', 'uploads', tipo);

        if (!fs.existsSync(linkCarga)) {
            fs.mkdirSync(linkCarga, { recursive: true });
        }
        cb(null, linkCarga);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const carga = multer ({storage: almacenamiento});

export const uploadMiddleware = carga.single("file");