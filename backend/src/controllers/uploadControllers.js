"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileFilter_1 = require("../utils/fileFilter");
// Configurar almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const savePath = path_1.default.join(__dirname, "../../uploads");
        // Crear carpeta si no existe
        if (!fs_1.default.existsSync(savePath)) {
            console.log("❌ La carpeta no existe, creando...");
            fs_1.default.mkdirSync(savePath, { recursive: true });
        }
        console.log("✅ Carpeta verificada:", savePath);
        cb(null, savePath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Inicializar `multer` con el filtro externo
const upload = (0, multer_1.default)({ storage, fileFilter: fileFilter_1.fileFilter });
// Middleware para manejar archivos
exports.uploadMiddleware = upload.single("file");
// Controlador para subir archivos
const handleFileUpload = (req, res) => {
    res.json({ message: "Archivo subido correctamente" });
};
exports.handleFileUpload = handleFileUpload;
