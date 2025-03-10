"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadControllers_1 = require("../controllers/uploadControllers");
const router = (0, express_1.Router)();
//Ruta para subir archivos
router.post("/", uploadControllers_1.uploadMiddleware, uploadControllers_1.handleFileUpload);
exports.default = router;
