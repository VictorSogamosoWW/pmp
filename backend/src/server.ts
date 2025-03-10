import app from "./app";
import { config } from "./config/config";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});