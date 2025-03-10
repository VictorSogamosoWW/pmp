import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, Grid, CssBaseline } from "@mui/material";

const App = () => {
  const [filesUploaded, setFilesUploaded] = useState(false);

  const handleFileUpload = () => {
    // Lógica para manejar la carga de archivos
    setFilesUploaded(true); // Simula que los archivos se han cargado
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PMP - Plan Maestro de Producción
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Menú Principal
          </Typography>
          <Typography variant="body1" gutterBottom>
            En este menú podrás generar el plan de producción. Asegúrate de cargar todos los archivos antes de poder oprimir la opción “GENERAR PLAN”.
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFileUpload}>
                Cargar Archivos
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                disabled={!filesUploaded}
              >
                GENERAR PLAN
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Información Empresarial
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          © 2023 Empresa XYZ. Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default App;