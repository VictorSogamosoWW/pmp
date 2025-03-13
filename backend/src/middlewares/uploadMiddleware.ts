import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const almacenamiento = multer.diskStorage({
    destination: (req: Request, file, cb) => { // Corregimos la función destination
        const tipo = req.body.tipo;

        if (!tipo) {
            return cb(new Error("El parámetro 'tipo' es obligatorio."));
        }

        const tipoNormalizado = tipo
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        const linkCarga = path.join(__dirname, '..', 'uploads', tipoNormalizado);

        if (!fs.existsSync(linkCarga)) {
            fs.mkdirSync(linkCarga, { recursive: true });
        }
        cb(null, linkCarga);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const carga = multer({ storage: almacenamiento });

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    carga.fields([{ name: 'tipo', maxCount: 1 }, { name: 'file', maxCount: 1 }])(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};