import express from "express";
import {config} from "./config/config";
import {middlewares} from "./middlewares/middlewares";
import {routes} from "./routes/routes";

const app = express();

//Aplicacion de middlewares
middlewares(app);

//Configuración de rutas
routes(app);

export default app;