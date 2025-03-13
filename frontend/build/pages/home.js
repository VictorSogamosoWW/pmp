import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Typography, Box, CircularProgress, List, ListItem, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';
const categories = ['Pronósticos de Venta', 'Políticas de Producción', 'Rutas y Estándares', 'Capacidad'];
const Home = () => {
    const [fileStatus, setFileStatus] = useState(Object.fromEntries(categories.map(category => [category, 'pending'])));
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const handleFileUpload = async (file, category) => {
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
        }
        catch (error) {
            setFileStatus(prev => ({ ...prev, [category]: 'error' }));
        }
    };
    const allFilesUploaded = categories.every(category => fileStatus[category] === 'completed');
    return (_jsx(Container, { children: _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Plan Maestro de Producci\u00F3n (PMP)" }), _jsx(Typography, { variant: "body1", children: "Aseg\u00FArate de cargar todos los archivos antes de generar el plan." }), _jsx(List, { children: categories.map(category => (_jsxs(ListItem, { sx: { display: 'flex', alignItems: 'center' }, children: [_jsx(Typography, { sx: { flexGrow: 1 }, children: category }), _jsx(FileUploader, { onFileUpload: (file) => handleFileUpload(file, category) }), fileStatus[category] === 'uploading' && _jsx(CircularProgress, { size: 24, sx: { ml: 2 } }), fileStatus[category] === 'completed' && _jsx(CheckCircleIcon, { color: "success", sx: { ml: 2 } }), fileStatus[category] === 'error' && _jsx(ErrorIcon, { color: "error", sx: { ml: 2 } })] }, category))) }), _jsx(Button, { variant: "contained", color: "primary", disabled: !allFilesUploaded, sx: { mt: 2 }, children: "GENERAR PLAN" })] }) }));
};
export default Home;
