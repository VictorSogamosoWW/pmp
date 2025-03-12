import React, { useState } from 'react';
import { Container, Typography, Box, Button, CircularProgress, List, ListItem, IconButton } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

const FILE_CATEGORIES = [
  'Pronósticos de Venta',
  'Políticas de Producción',
  'Rutas y Estándares',
  'Capacidad'
];

const FileUploadManager: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFiles((prev) => ({ ...prev, [category]: file }));
    }
  };

  const handleUpload = async (category: string) => {
    if (!uploadedFiles[category]) return;
    setUploading((prev) => ({ ...prev, [category]: true }));

    // Simulación de carga
    setTimeout(() => {
      setUploading((prev) => ({ ...prev, [category]: false }));
    }, 2000);
  };

  const handleDelete = (category: string) => {
    setUploadedFiles((prev) => ({ ...prev, [category]: null }));
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Carga de Archivos
        </Typography>

        {FILE_CATEGORIES.map((category) => (
          <Box key={category} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">{category}</Typography>
            <input
              type="file"
              style={{ display: 'none' }}
              id={`file-input-${category}`}
              onChange={(e) => handleFileChange(e, category)}
            />
            <label htmlFor={`file-input-${category}`}>
              <Button variant="contained" component="span" startIcon={<CloudUpload />} sx={{ mt: 1 }}>
                Seleccionar Archivo
              </Button>
            </label>
            {uploadedFiles[category] && (
              <List>
                <ListItem>
                  {uploadedFiles[category]?.name}
                  {uploading[category] ? (
                    <CircularProgress size={20} sx={{ ml: 2 }} />
                  ) : (
                    <IconButton onClick={() => handleDelete(category)} color="error">
                      <Delete />
                    </IconButton>
                  )}
                </ListItem>
              </List>
            )}
            <Button
              variant="outlined"
              onClick={() => handleUpload(category)}
              disabled={!uploadedFiles[category] || uploading[category]}
              sx={{ mt: 1 }}
            >
              Subir Archivo
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FileUploadManager;
