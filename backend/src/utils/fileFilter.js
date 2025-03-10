"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const path_1 = __importDefault(require("path"));
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".xls", ".xlsx", ".ods"];
    const allowedMimeTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/octet-stream", // Para evitar falsos rechazos en ODS
    ];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
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
exports.fileFilter = fileFilter;
