import React, { useState } from 'react';
import { Container, Typography, Box, Alert, CircularProgress, List, ListItem, IconButton, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';

const categories = ['Pronósticos de Venta', 'Políticas de Producción', 'Rutas y Estándares', 'Capacidad'];

type FileStatus = 'pending' | 'uploading' | 'completed' | 'error';

const Home: React.FC = () => {
  const [fileStatus, setFileStatus] = useState<{ [key: string]: FileStatus }>(
    Object.fromEntries(categories.map(category => [category, 'pending']))
  );
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; category: string }[]>([]);
  
  const handleFileUpload = async (file: File, category: string) => {
    setFileStatus(prev => ({ ...prev, [category]: 'uploading' }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('storageType', category);

    try {
      const response = await axios.post('http://localhost:3000/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadedFiles(prev => [...prev, { name: file.name, category }]);
      setFileStatus(prev => ({ ...prev, [category]: 'completed' }));
    } catch (error) {
      setFileStatus(prev => ({ ...prev, [category]: 'error' }));
    }
  };

  const allFilesUploaded = categories.every(category => fileStatus[category] === 'completed');

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Plan Maestro de Producción (PMP)
        </Typography>
        <Typography variant="body1">
          Asegúrate de cargar todos los archivos antes de generar el plan.
        </Typography>

        <List>
          {categories.map(category => (
            <ListItem key={category} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ flexGrow: 1 }}>{category}</Typography>
              <FileUploader onFileUpload={(file) => handleFileUpload(file, category)} />
              {fileStatus[category] === 'uploading' && <CircularProgress size={24} sx={{ ml: 2 }} />}
              {fileStatus[category] === 'completed' && <CheckCircleIcon color="success" sx={{ ml: 2 }} />}
              {fileStatus[category] === 'error' && <ErrorIcon color="error" sx={{ ml: 2 }} />}
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          disabled={!allFilesUploaded}
          sx={{ mt: 2 }}
        >
          GENERAR PLAN
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
