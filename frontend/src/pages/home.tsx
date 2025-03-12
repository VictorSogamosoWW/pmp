import React, { useState } from 'react';
import { Container, Typography, Box, Alert, CircularProgress, Button, List, ListItem, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string }[]>([]);

  const handleFileUpload = async (file: File, storageType: string) => {
    setLoading(true);
    setMessage(null);
    setIsError(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('storageType', storageType);

    try {
      const response = await axios.post('http://localhost:3000/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadedFiles([...uploadedFiles, { name: file.name, type: storageType }]);
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage('Error al subir el archivo');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Plan Maestro de Producción (PMP)
        </Typography>
        
        {/* Cargadores de archivos individuales */}
        <Typography variant="h6">Pronósticos de Venta</Typography>
        <FileUploader onFileUpload={(file) => handleFileUpload(file, 'pronosticos')} />

        <Typography variant="h6">Políticas de Producción</Typography>
        <FileUploader onFileUpload={(file) => handleFileUpload(file, 'politicas')} />

        <Typography variant="h6">Rutas y Estándares</Typography>
        <FileUploader onFileUpload={(file) => handleFileUpload(file, 'rutas')} />

        <Typography variant="h6">Capacidad</Typography>
        <FileUploader onFileUpload={(file) => handleFileUpload(file, 'capacidad')} />

        {/* Indicador de carga */}
        {loading && <CircularProgress sx={{ display: 'block', my: 2 }} />}

        {/* Mensaje de estado */}
        {message && (
          <Alert severity={isError ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        {/* Lista de archivos subidos */}
        <List>
          {uploadedFiles.map((file, index) => (
            <ListItem key={index}>
              {file.name} ({file.type})
              <IconButton onClick={() => handleDeleteFile(file.name)}>
                <Delete color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Home;
