import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileUploaderProps {
  onFileUpload: (file: File, category: string) => Promise<void>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  const categories = [
    'pronosticos',
    'politicas',
    'rutas',
    'capacidad',
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFiles((prev) => ({ ...prev, [category]: file }));
    }
  };

  const handleUpload = async (category: string) => {
    const file = selectedFiles[category];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [category]: true }));
    try {
        console.log("Archivo a subir:", file);
        await onFileUpload(file, category);
        setUploading((prev) => ({ ...prev, [category]: false }));
    } catch (error) {
        console.error("Error al subir archivo:", error);
        setUploading((prev) => ({ ...prev, [category]: false }));
        alert("Error al subir el archivo. Por favor, inténtalo de nuevo.");
    }
};

  const handleRemoveFile = (category: string) => {
    setSelectedFiles((prev) => ({ ...prev, [category]: null }));
  };

  return (
    <Box>
      {categories.map((category) => (
        <Box key={category} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, category)}
            accept=".xlsx, .csv"
          />
          {selectedFiles[category] && (
            <List>
              <ListItem>
                {selectedFiles[category]?.name}
                <IconButton onClick={() => handleRemoveFile(category)}>
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </List>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpload(category)}
            disabled={!selectedFiles[category] || uploading[category]}
          >
            {uploading[category] ? <CircularProgress size={24} /> : 'Subir'}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default FileUploader;
