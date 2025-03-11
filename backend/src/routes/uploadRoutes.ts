import {Router} from "express";
import {uploadMiddleware, handleFileUpload} from "../controllers/uploadControllers.js";

const router = Router();

//Ruta para subir archivos
router.post("/", uploadMiddleware, handleFileUpload);

export default router;