"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes")); // Importación predeterminada
const app = (0, express_1.default)();
// Configurar el frontendPath
const frontendPath = path_1.default.join(__dirname, '../frontend/dist');
// Servir archivos estáticos del frontend
app.use(express_1.default.static(frontendPath));
// Middleware para manejar JSON
app.use(express_1.default.json());
// Rutas de la API
(0, routes_1.default)(app); // Pasar la instancia de Express a la función routes
// Manejar todas las demás rutas y servir el index.html del frontend
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(frontendPath, 'index.html'));
});
exports.default = app;
