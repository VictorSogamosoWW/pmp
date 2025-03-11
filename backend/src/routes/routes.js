"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadRoutes_1 = __importDefault(require("./uploadRoutes.js"));
const path_1 = __importDefault(require("path"));
const routes = (app) => {
    const router = express_1.default.Router();
    const frontendPath = path_1.default.join(__dirname, '../../frontend/dist');
    app.use(express_1.default.static(frontendPath));
    router.get("/", (req, res) => {
        res.send("API funcionando");
    });
    // Integrar rutas de upload
    router.use("/uploads", uploadRoutes_1.default);
    app.use(router);
};
exports.default = routes;
