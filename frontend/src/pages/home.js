import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';
const Home = () => {
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:3000/uploads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
            setIsError(false);
        }
        catch (error) {
            setMessage('Error al subir el archivo');
            setIsError(true);
        }
    };
    return (_jsx(Container, { children: _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Plan Maestro de Producci\u00F3n (PMP)" }), _jsx(FileUploader, { onFileUpload: handleFileUpload }), message && (_jsx(Alert, { severity: isError ? 'error' : 'success', sx: { mt: 2 }, children: message }))] }) }));
};
export default Home;
