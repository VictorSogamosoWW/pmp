import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/home';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
};

export default App;