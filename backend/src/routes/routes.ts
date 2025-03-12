import { Express } from "express";
import express from "express";
import uploadRoutes from "./uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const routes = (app: Express) => {
    const router = express.Router();

    const frontendPath = path.join(__dirname, '../../frontend/dist');
    app.use(express.static(frontendPath));

    router.get("/", (req, res) => {
        res.send("API funcionando");
    });

    // Integrar rutas de upload
    router.use("/uploads", uploadRoutes);
    app.use(router);
};
