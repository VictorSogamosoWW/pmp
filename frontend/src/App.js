import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/home';
const theme = createTheme();
const App = () => {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(Home, {})] }));
};
export default App;
