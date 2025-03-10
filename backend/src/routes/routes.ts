import { Express } from "express";
import express from "express";
import uploadRoutes from "./uploadRoutes";
import path from 'path';

const routes = (app: Express) => {
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

export default routes;