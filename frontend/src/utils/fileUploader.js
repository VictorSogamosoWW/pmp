import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
const FileUploader = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            onFileUpload(file);
        }
    };
    return (_jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 3 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Cargar Archivo Excel" }), _jsx("input", { type: "file", accept: ".xlsx, .xls", onChange: handleFileChange, style: { display: 'none' }, id: "file-upload" }), _jsx("label", { htmlFor: "file-upload", children: _jsx(Button, { variant: "contained", component: "span", sx: { mr: 2 }, children: "Seleccionar Archivo" }) }), _jsx(Button, { type: "submit", variant: "contained", color: "primary", disabled: !file, children: "Subir Archivo" }), file && (_jsxs(Typography, { variant: "body1", sx: { mt: 2 }, children: ["Archivo seleccionado: ", file.name] }))] }));
};
export default FileUploader;
