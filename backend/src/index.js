"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("../src/routes/routes"));
//Cargar variables del entorno
dotenv_1.default.config();
//Crear la aplicacion Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//Middleware para proceso de JSON
app.use(express_1.default.json());
(0, routes_1.default)(app);
//Iniciar servidor
app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
});
