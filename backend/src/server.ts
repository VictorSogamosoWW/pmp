import app from "./app.js";
import { config } from "./config/config.js";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});