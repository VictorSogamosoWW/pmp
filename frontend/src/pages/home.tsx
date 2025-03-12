import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage('Error al subir el archivo');
      setIsError(true);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Plan Maestro de Producción (PMP)
        </Typography>
        <FileUploader onFileUpload={handleFileUpload} />
        {message && (
          <Alert severity={isError ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Home;