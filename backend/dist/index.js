import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
//Prueba de funcionalidad
console.log("Funcionando el back");
//Cargar variables del entorno
dotenv.config();
//Crear la aplicacion Express
const app = express();
const PORT = process.env.PORT || 3000;
//Middleware para proceso de JSON
app.use(express.json());
routes(app);
//Iniciar servidor
app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
});
