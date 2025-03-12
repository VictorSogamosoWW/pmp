import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:3000/uploads", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error al subir el archivo");
      }
  
      const data = await response.json();
      console.log("✅ Archivo subido:", data);
    } catch (error) {
      console.error("❌ Error al subir el archivo:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cargar Archivo Excel
      </Typography>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" sx={{ mr: 2 }}>
          Seleccionar Archivo
        </Button>
      </label>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!file}
      >
        Subir Archivo
      </Button>
      {file && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Archivo seleccionado: {file.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploader;