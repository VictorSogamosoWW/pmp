import React from 'react';
import { Container, Typography, Box, List, ListItem } from '@mui/material';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';

const Home: React.FC = () => {
  const handleFileUpload = async (file: File, category: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('storageType', category);

    try {
      await axios.post('http://localhost:3000/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Archivo subido correctamente:", file.name, category);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Plan Maestro de Producción (PMP)
        </Typography>
        <List>
          <ListItem key="pronosticos">
            <Typography sx={{ flexGrow: 1 }}>Pronósticos de Venta</Typography>
            <FileUploader onFileUpload={(file) => handleFileUpload(file, "pronosticos")} />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Home;