import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Typography, Box, Alert, CircularProgress, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploader from '../utils/fileUploader';
import axios from 'axios';
const Home = () => {
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const handleFileUpload = async (file, category) => {
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
        }
        catch (error) {
            setMessage('Error al subir el archivo');
            setIsError(true);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDeleteFile = (fileName) => {
        setUploadedFiles((prev) => prev.filter(file => file.name !== fileName));
    };
    return (_jsx(Container, { children: _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Plan Maestro de Producci\u00F3n (PMP)" }), _jsx(FileUploader, { onFileUpload: handleFileUpload }), loading && _jsx(CircularProgress, { sx: { display: 'block', my: 2 } }), message && (_jsx(Alert, { severity: isError ? 'error' : 'success', sx: { mt: 2 }, children: message })), _jsx(List, { children: uploadedFiles.map((file, index) => (_jsxs(ListItem, { children: [file.name, " (", file.category, ")", _jsx(IconButton, { onClick: () => handleDeleteFile(file.name), children: _jsx(DeleteIcon, { color: "error" }) })] }, index))) })] }) }));
};
export default Home;
