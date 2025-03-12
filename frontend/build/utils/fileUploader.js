import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, CircularProgress, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const FileUploader = ({ onFileUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState({});
    const [uploading, setUploading] = useState({});
    const categories = [
        'pronosticos',
        'politicas',
        'rutas',
        'capacidad',
    ];
    const handleFileChange = (event, category) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFiles((prev) => ({ ...prev, [category]: file }));
        }
    };
    const handleUpload = async (category) => {
        const file = selectedFiles[category];
        if (!file)
            return;
        setUploading((prev) => ({ ...prev, [category]: true }));
        await onFileUpload(file, category);
        setUploading((prev) => ({ ...prev, [category]: false }));
    };
    const handleRemoveFile = (category) => {
        setSelectedFiles((prev) => ({ ...prev, [category]: null }));
    };
    return (_jsx(Box, { children: categories.map((category) => (_jsxs(Box, { sx: { mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }, children: [_jsx(Typography, { variant: "h6", children: category.charAt(0).toUpperCase() + category.slice(1) }), _jsx("input", { type: "file", onChange: (e) => handleFileChange(e, category), accept: ".xlsx, .csv" }), selectedFiles[category] && (_jsx(List, { children: _jsxs(ListItem, { children: [selectedFiles[category]?.name, _jsx(IconButton, { onClick: () => handleRemoveFile(category), children: _jsx(DeleteIcon, { color: "error" }) })] }) })), _jsx(Button, { variant: "contained", color: "primary", onClick: () => handleUpload(category), disabled: !selectedFiles[category] || uploading[category], children: uploading[category] ? _jsx(CircularProgress, { size: 24 }) : 'Subir' })] }, category))) }));
};
export default FileUploader;
