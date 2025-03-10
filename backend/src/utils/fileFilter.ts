import { Request } from "express";
import { FileFilterCallback } from "multer";
import path from "path";

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedExtensions = [".xls", ".xlsx", ".ods"];
    const allowedMimeTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/octet-stream", // Para evitar falsos rechazos en ODS
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(mime)) {
        return cb(null, true);
    }

    // Si es un archivo ODS con `application/octet-stream`, lo aceptamos
    if (ext === ".ods" && mime === "application/octet-stream") {
        return cb(null, true);
    }

    return cb(new Error("Solo se permiten archivos Excel y LibreOffice (ODS)"));
};