import {Express} from "express";
import express from "express";
import uploadRoutes from "./uploadRoutes";

export const routes = (app: Express)=> {
    const router = express.Router();
    
    router.get("/", (req, res) => {
        res.send("API funcionando");
    });

//Integrar rutas de upload
router.use("/uploads", uploadRoutes);
app.use(router);
};