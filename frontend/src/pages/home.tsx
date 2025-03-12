import React, { useState } from 'react';
import { Container, Typography, Box, Alert, CircularProgress, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; category: string }[]>([]);

  const handleFileUpload = async (file: File, category: string) => {
    setLoading(true);
    setMessage(null);
    setIsError(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('storageType', category);

    try {
      const response = await axios.post('http://localhost:3000/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadedFiles((prev) => [...prev, { name: file.name, category }]);
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
    setUploadedFiles((prev) => prev.filter(file => file.name !== fileName));
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Plan Maestro de Producción (PMP)
        </Typography>

        <FileUploader onFileUpload={handleFileUpload} />

        {loading && <CircularProgress sx={{ display: 'block', my: 2 }} />}

        {message && (
          <Alert severity={isError ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        <List>
          {uploadedFiles.map((file, index) => (
            <ListItem key={index}>
              {file.name} ({file.category})
              <IconButton onClick={() => handleDeleteFile(file.name)}>
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Home;