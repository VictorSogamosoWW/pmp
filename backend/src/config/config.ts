import dotenv from "dotenv";

//Cargar variables del entorno
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "",
};