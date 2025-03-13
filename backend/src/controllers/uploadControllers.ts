import { Request, Response, Express } from "express";

export const handleFileUpload = (req: Request & { files: Record<string, Express.Multer.File[]> }, res: Response): void => {
    if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
        res.status(400).json({ message: "No se ha subido ningún archivo" });
        return;
    }
    const file = req.files['file'][0];

    res.json({
        message: "Archivo subido correctamente",
        file: {
            nombreOriginal: file.originalname,
            ubicacion: file.path,
            tamaño: file.size,
        },
    });
};