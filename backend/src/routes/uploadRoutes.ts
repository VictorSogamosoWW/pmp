import {Router} from "express";
import {handleFileUpload} from "../controllers/uploadControllers.js";
import {uploadMiddleware} from "../middlewares/uploadMiddleware.js";

const router = Router();

//Ruta para subir archivos
router.post("/", uploadMiddleware, handleFileUpload);

export default router;