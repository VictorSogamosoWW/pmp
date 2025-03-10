import app from "./app";
import { config } from "./config/config";

const PORT = config.PORT || 1111;

app.listen(PORT, ()=>{
    console.log("Servidor corriendo")
});