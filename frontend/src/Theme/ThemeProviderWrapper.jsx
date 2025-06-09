// ThemeProviderWrapper.jsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './Theme';
import { useSelector } from 'react-redux';

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeProviderWrapper = ({ children }) => {
    const selectedTheme = useSelector((state) => state.themes.themeMod)
    const [mode, setMode] = useState('light');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => getTheme(selectedTheme), [selectedTheme]);

    return (
        <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};
