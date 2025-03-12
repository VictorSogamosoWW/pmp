import { Request, Response } from "express";

//Manejo de carga del archivo
export const handleFileUpload = (req: Request, res: Response): void => {
    if (!req.file){
        res.status(400).json({message: "No se ha subido ningun archivo"});
    }
    res.json({
        message: "Archivo subido correctamente",
        file: {
            nombreOriginal: req.file?.originalname,
            ubicacion: req.file?.path,
            tamaño: req.file?.size,
        }
    });
};